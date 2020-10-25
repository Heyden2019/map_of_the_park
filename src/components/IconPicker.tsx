import { Input } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import * as icons from './../icons/icons'

const IconPicker: FC<any> = ({ formik }) => {

    const [showPicker, setShowPicker] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState(icons.tree)

    useEffect(() => {
        formik.setFieldValue('icon', selectedIcon)
    }, [selectedIcon])

    return (
        <div className='icon-picker'>

            {showPicker &&
                <div className="ant-input icon-picker__window">
                    {Object.values(icons).map((icon) => (
                        <img src={icon}
                            key={icon}
                            width='14px'
                            height='14px'
                            onClick={() => {
                                setSelectedIcon(icon)
                                setShowPicker(false)
                            }} />
                    ))}
                </div>
            }
            
            <div className="ant-input selected-icon" onClick={() => { setShowPicker(prev => !prev) }}>
                <img src={selectedIcon} />
            </div>

            <Input
                id="scale"
                type="number"
                step="0.01"
                min={0.01}
                max={5}
                default={0.1}
                autoComplete='off'
                {...formik.getFieldProps('scale')}
            />
            
        </div>
    )
}

export default IconPicker
