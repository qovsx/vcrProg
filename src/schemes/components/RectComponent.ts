import { Graphics } from '@pixi/graphics'

export interface IRectComponentParams {
    color: number,
    fillColor: number,
}

export default class RectComponent extends Graphics {
    private fillRect = new Graphics()

    constructor(params: IRectComponentParams) {
        super()
        const w = 140
        const h = 70
        this.beginFill(params.color)
            .drawRect(-w / 2, -h / 2, w, h)
            .endFill()

        this.fillRect.beginFill(params.fillColor)
            .drawRect(0, -h / 2, w, h)
            .endFill()
        this.fillRect.x = -w / 2
        this.fillRect.scale.x = 0
        this.addChild(this.fillRect)

        const border = new Graphics()
            .lineStyle({ native: true, width: 1, color: 0 })
            .drawRect(-w / 2, -h / 2, w, h)
            .endFill()
        this.addChild(border)
    }

    public set fillCoefficent(value: number) {
        this.fillRect.scale.x = value
    } 
}
