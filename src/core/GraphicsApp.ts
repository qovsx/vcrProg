import { BatchRenderer, extensions as Extensions, Renderer } from '@pixi/core'
import { Container } from '@pixi/display'


export default class GraphicsApp {
    public view: HTMLCanvasElement
    public renderer: Renderer
    public stage = new Container()

    constructor(view: HTMLCanvasElement) {
        this.view = view
        Extensions.add(BatchRenderer)
        this.renderer = new Renderer({
            width: this.view.width * 2,
            height: this.view.height * 2,
            view: this.view,
            backgroundColor: 0xffffff,
        })
        this.stage.position.set(
            this.view.width / 2,
            this.view.height / 2,
        )
    }

    public start(): void {
    }

    public render(): void {
        this.renderer.render(this.stage)
    }

    public update(deltaTime: number): void {
    }

    public resize(width: number, height: number): void {
    }
}
