import React, { useEffect } from 'react'
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Map } from 'ol';
import VectorSource from 'ol/source/Vector';
import {defaultZoom} from "./../settings"


type PropsType = {
    setAddPointFormInfo: React.Dispatch<React.SetStateAction<Feature<Point> | null>>
    setCurrentObject: React.Dispatch<React.SetStateAction<Feature<Point> | null>>
    map: Map | undefined
    vectorSource: VectorSource<Point> | undefined
}

export default ({setAddPointFormInfo, setCurrentObject, map, vectorSource} : PropsType) => {

    useEffect(() => {
        if(map && vectorSource) {
            map.getView().on("change:resolution", function () {
                //@ts-ignore
                const currentZoom = this.getZoom()
                setAddPointFormInfo(null)
                setCurrentObject(null)
                vectorSource.forEachFeature((feature) => {
                    const defaultScale = feature.getProperties().scale
                    //@ts-ignore
                    feature.getStyle().getImage().setScale(defaultScale * currentZoom / defaultZoom)
                })
            })
        }
    }, [map, vectorSource])

    return null
}

