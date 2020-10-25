import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import React, { FC } from 'react'
import { Popover } from 'antd';
import { Map } from 'ol';

type PropsType = {
    currentObject: Feature<Point>
    map: Map | undefined
}

const ObjectInfo: FC<PropsType> = ({currentObject, map}) => {

    if(!map) return null

    const center = currentObject.getGeometry().getCoordinates()
    map.getView().setCenter(center)
    
    return (
        <Popover 
            content={currentObject.getProperties().description} 
            title={currentObject.getProperties().title} 
            visible={true}>
            <div className="center-point"></div>
        </Popover>
    )
}

export default ObjectInfo
