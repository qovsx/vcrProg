import { Container } from '@pixi/display'
import { Text } from '@pixi/text'
import ArrowComponent from 'schemes/components/ArrowComponent'
import CircleComponent from 'schemes/components/CircleComponent'
import RectComponent from 'schemes/components/RectComponent'
import timeFormatter from 'schemes/timeFormatter'

const palette = {
    'red': 0xf794cc,
    'green': 0xa2d998,
    'blue': 0x82aaea,
}

export default class Scheme1 extends Container {
    public inputStream: CircleComponent
    public queue: CircleComponent
    public processing: RectComponent
    public outputStream: CircleComponent
    public cancelStream: CircleComponent

    public htmlElementProcessed: HTMLElement
    public htmlElementProfit: HTMLElement
    public htmlElementCancel: HTMLElement
    public htmlElementLostProfit: HTMLElement

    private _time = 0
    private timeView = new Text(timeFormatter.format(this._time))

    constructor(
        htmlElementProcessed: HTMLElement,
        htmlElementProfit: HTMLElement,
        htmlElementCancel: HTMLElement,
        htmlElementLostProfit: HTMLElement,
    ) {
        super()

        this.htmlElementProcessed = htmlElementProcessed
        this.htmlElementProfit = htmlElementProfit
        this.htmlElementCancel = htmlElementCancel
        this.htmlElementLostProfit = htmlElementLostProfit

        const { red, green, blue } = palette

        const inputStream = new CircleComponent({ color: green })
        inputStream.x = -250
        inputStream.y = -50
        const queue = new CircleComponent({ color: blue })
        queue.x = -100
        queue.y = -50
        const cancelStream = new CircleComponent({ color: red })
        cancelStream.x = -100
        cancelStream.y = 70
        const arrowQueueToCancel = new ArrowComponent({
            from: { x: queue.x, y: queue.y + 40 },
            to: { x: cancelStream.x, y: cancelStream.y - 40 }
        })
        const arrowInputToQueue = new ArrowComponent({
            from: { x: inputStream.x + 40, y: -50 },
            to: { x: queue.x - 40, y: -50 }
        })
        const processing = new RectComponent({
            color: blue,
            fillColor: red,
        })
        processing.x = 80
        processing.y = -50
        const arrowQueueToProcessing = new ArrowComponent({
            from: { x: queue.x + 40, y: -50 },
            to: { x: processing.x - 70, y: -50 }
        })
        const outputStream = new CircleComponent({ color: red })
        outputStream.x = 250
        outputStream.y = -50
        const arrowProcessingToOutput = new ArrowComponent({
            from: { x: processing.x + 70, y: -50 },
            to: { x: outputStream.x - 40, y: -50 }
        })

        this.addChild(
            inputStream,
            arrowInputToQueue,
            queue,
            arrowQueueToCancel,
            cancelStream,
            arrowQueueToProcessing,
            processing,
            arrowProcessingToOutput,
            outputStream,
            this.timeView,
        )

        this.timeView.position.set(-280, -140)

        this.inputStream = inputStream
        this.queue = queue
        this.processing = processing
        this.outputStream = outputStream
        this.cancelStream = cancelStream
    }

    public update(time: number) {
        this._time = time
        this.timeView.text = timeFormatter.format(this._time)
    }
}
