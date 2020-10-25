import React, { useState } from 'react';
import 'antd/dist/antd.css';
import 'ol/ol.css';
import './styles/App.sass';
import Map from './components/Map';
import Vector from './components/Vector';
import Point from 'ol/geom/Point';
import { Feature, Map as MapType } from 'ol';
import AddPointForm from './components/AddPointForm';
import ObjectList from './components/ObjectList';
import ObjectInfo from './components/ObjectInfo';
import Zoom from './components/Zoom';
import VectorSource from 'ol/source/Vector';

function App() {

  const [map, setMap] = useState<MapType>()
  const [vectorSource, setVectorSource] = useState<VectorSource<Point>>()
  const [addPointFormInfo, setAddPointFormInfo] = useState<Feature<Point> | null>(null)
  const [currentObject, setCurrentObject] = useState<Feature<Point> | null>(null)
  const [mouseDownPosition, setMouseDownPosition] = useState<{ x: number, y: number } | null>(null)

  const onMapClick = (e: any) => {
    const hasMouseMoved = !(e.clientX === mouseDownPosition?.x && e.clientY === mouseDownPosition?.y)
    if(!hasMouseMoved && map) {
      const features = map.getFeaturesAtPixel(map.getEventPixel(e)) as Feature<Point>[]
      if (features.length) {
        if (features[0].getProperties().title) {
          setCurrentObject(features[0])
        }
      } else {
        const feature = new Feature(new Point(map.getEventCoordinate(e)))
        setAddPointFormInfo(feature)
      }
    }
  }

  const onMouseDown = (e: any) => {
    setCurrentObject(null)
    setMouseDownPosition({ x: e.clientX, y: e.clientY })
  }

  return (<>
    <Map 
      onMouseUp={onMapClick}
      onMouseDown={onMouseDown}
      setMap={setMap}>

      <Vector 
        setVectorSource={setVectorSource}
        map={map} />

      <Zoom 
        setAddPointFormInfo={setAddPointFormInfo}
        setCurrentObject={setCurrentObject}
        map={map}
        vectorSource={vectorSource} />

    </Map>
    <ObjectList 
      setCurrentObject={setCurrentObject}
      map={map}
      vectorSource={vectorSource} />

    { addPointFormInfo && 
      <AddPointForm feature={addPointFormInfo}
        vectorSource={vectorSource}
        setAddPointFormInfo={setAddPointFormInfo} />
    }
    { currentObject && 
      <ObjectInfo map={map}
        currentObject={currentObject} />
    }
  </>
  );
}

export default App;
