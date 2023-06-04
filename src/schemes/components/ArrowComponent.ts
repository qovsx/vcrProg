import { Graphics } from '@pixi/graphics'

export interface IArrowComponentParams {
    from: { x: number, y: number },
    to: { x: number, y: number },
}

const angleLookAt = (x1: number, y1: number, x2: number, y2: number) => (
    Math.atan2(y2 - y1, x2 - x1)
)

export default class ArrowComponent extends Graphics {
    constructor(params: IArrowComponentParams) {
        super()
        const coord =  {
            x: params.to.x - params.from.x,
            y: params.to.y - params.from.y
        }
        this.beginFill(0)
            .lineStyle({ native: true, width: 1, color: 0 })
            .lineTo(coord.x, coord.y)
            .endFill()

        this.position.copyFrom(params.from)

        const arrowPointer = new Graphics()
        arrowPointer.beginFill(0).drawPolygon([
            { x: 0, y: 0},
            { x: -14, y: 8},
            { x: -14, y: -8},
        ]).endFill()
        arrowPointer.position.copyFrom(coord)
        this.addChild(arrowPointer)

        arrowPointer.rotation = angleLookAt(
            params.from.x,
            params.from.y,
            params.to.x,
            params.to.y,
        )
    }
}
