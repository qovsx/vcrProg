import { Graphics } from '@pixi/graphics'
import { Text } from '@pixi/text'

export interface ICircleComponentParams {
    color: number,
}

export default class CircleComponent extends Graphics {
    private _count = 0
    private countView = new Text(this._count)

    constructor(params: ICircleComponentParams) {
        super()
        this.beginFill(params.color)
            .lineStyle({ native: true, width: 1, color: 0 })
            .drawCircle(0, 0, 40)
            .endFill()

        this.countView.anchor.set(0.5)
        this.addChild(this.countView)
    }

    public get count() {
        return this._count
    }

    public set count(value: number) {
        this._count = value
        this.countView.text = value
    }
}
