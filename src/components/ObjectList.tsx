import React, { FC, useState } from 'react'
import { Button, Card, Col, Input, Row } from 'antd';
import { Map, Feature } from 'ol'
import Point from 'ol/geom/Point'
import VectorSource from 'ol/source/Vector';

type PropsType = {
    setCurrentObject: React.Dispatch<React.SetStateAction<Feature<Point> | null>>
    map: Map | undefined
    vectorSource: VectorSource<Point> | undefined
}

const ObjectList: FC<PropsType> = ({ setCurrentObject, map, vectorSource }) => {

    const [filter, setfilter] = useState("")
    const [isSortByAlphabet, setIsSortByAlphabet] = useState(true)

    //all features
    let features = vectorSource?.getFeatures() 

    //filter features
    features = features?.filter((feature) => {
        const title = feature.getProperties().title
        return title && title.includes(filter.trim())
    })

    //sort filtered features by alpha
    features = features?.sort((a, b): any => {
        return a.getProperties().title > b.getProperties().title ? 1 : a.getProperties().title < b.getProperties().title ? -1 : 0
    })

    //reverse features to get sorted back
    if (!isSortByAlphabet) features = features?.reverse()

    const showThisFeature = (feature: Feature<Point>) => {
        if (map) {
            const featureCoordinates = feature.getGeometry().getCoordinates()
            map.getView().setCenter(featureCoordinates)
        }
        setCurrentObject(feature)
    }

    return (
        <div className="objects">

            <Row className="objects__row">
                <Col style={{  display: 'flex' }} className="objects__col">
                    <Input
                        type="text"
                        placeholder='Search'
                        autoComplete='off'
                        value={filter}
                        onChange={(e: any) => setfilter(e.currentTarget.value)} 
                        />
                    <Button onClick={() => setIsSortByAlphabet(prev => !prev)}>
                        {isSortByAlphabet ? <>&darr;</> : <>&uarr;</>}
                    </Button>
                </Col>
            </Row>

            {features?.map((feature) => (
                <Row className="objects__row" onClick={() => showThisFeature(feature)}>
                    <Col className="objects__col">
                        <Card title={feature.getProperties().title} bordered={false} size='small'>
                            {feature.getProperties().description}
                        </Card>
                    </Col>
                </Row>
            ))}
        </div>
    )
}

export default ObjectList
