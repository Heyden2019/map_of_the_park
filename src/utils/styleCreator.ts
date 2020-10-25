import { Style, Icon, Circle, Fill, Stroke } from "ol/style"

type IconParamType = {
    icon?: string
    scale?: number
}
const styleCreator = (iconParam: IconParamType = {}) => {
    if (iconParam.icon) {
        return new Style({
            image: new Icon({
                src: iconParam.icon,
                scale: iconParam.scale || 1,
            }),
        })
    } else {
        return new Style({
            image: new Circle({
                radius: 5,
                fill: new Fill({ color: 'red' }),
                stroke: new Stroke({
                    color: 'blue',
                    width: 3
                }),
            })
        })
    }
}

export default styleCreator