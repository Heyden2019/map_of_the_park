import React, { FC, useEffect } from 'react'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Point from 'ol/geom/Point'
import { Map } from 'ol'

type PropsType = {
    setVectorSource: React.Dispatch<React.SetStateAction<VectorSource<Point> | undefined>>
    map: Map | undefined
}

const Vector: FC<PropsType> = ({ setVectorSource, map }) => {

    useEffect(() => {
        let vectorLayer: VectorLayer
        if (map) {
            const vectorSource = new VectorSource<Point>()
            vectorLayer = new VectorLayer({ source: vectorSource })
            map.addLayer(vectorLayer)
            setVectorSource(vectorSource)
        }
        return () => {
            map?.removeLayer(vectorLayer)
        }
    }, [map])

    return null
}

export default Vector
