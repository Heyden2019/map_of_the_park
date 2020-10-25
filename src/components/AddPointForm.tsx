import { useFormik } from 'formik'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import React, { FC, useEffect } from 'react'
import { Button, Input } from 'antd';
import IconPicker from './IconPicker'
import styleCreator from '../utils/styleCreator'
import VectorSource from 'ol/source/Vector';

type PropsType = {
    feature: Feature<Point>
    setAddPointFormInfo: React.Dispatch<React.SetStateAction<Feature<Point> | null>>
    vectorSource: VectorSource<Point> | undefined
}

const AddPointForm: FC<PropsType> = ({ feature, setAddPointFormInfo, vectorSource }) => {

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            icon: '',
            scale: 1
        },
        onSubmit: (values, { resetForm }) => {
            const description = values.description.trim()
            const title = values.title.trim()
            if (description && title && values.scale) {
                const finalFeature = feature.clone() as Feature<Point>
                finalFeature.setStyle(styleCreator({ ...values }))
                finalFeature.setProperties({ ...values, description, title })
                vectorSource?.addFeature(finalFeature)
                resetForm()
                setAddPointFormInfo(null)
            }
        },

    })

    useEffect(() => {
        if (vectorSource) {
            feature.setStyle(styleCreator())
            vectorSource.addFeature(feature)
        }
        return () => {
            vectorSource?.removeFeature(feature)
        }
    }, [feature])

    return (
        <form onSubmit={formik.handleSubmit}
            className='add_point_form' >
            <Input
                id="title"
                type="text"
                placeholder='Title'
                autoComplete='off'
                {...formik.getFieldProps('title')} />

            <Input
                id="description"
                type="text"
                placeholder='Description'
                autoComplete='off'
                maxLength={50}
                {...formik.getFieldProps('description')} />

            <IconPicker formik={formik} />
            <Button size="small" onClick={formik.submitForm}>Add</Button>
            <Button size="small" onClick={() => setAddPointFormInfo(null)}>Cancel</Button>
        </form>

    )
}

export default AddPointForm
