import React, { FC, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import {defaultZoom, defaultCoordinates} from "./../settings"

const MapComponent: FC<any> = ({ children, onMouseUp, onMouseDown, setMap }) => {

    const defaultCoordinatesWebMercator = fromLonLat(defaultCoordinates);
    const mapRef = useRef<any>()

    useEffect(() => {
        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                })
            ],
            view: new View({
                center: defaultCoordinatesWebMercator,
                zoom: defaultZoom,
            })
        });
        setMap(map)
    }, [])

    return (
        <div id="map" ref={mapRef} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
            {children}
        </div>
    );
}

export default MapComponent
