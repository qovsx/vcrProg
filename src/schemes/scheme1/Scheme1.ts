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
        inputStream.y = 0
        const queue = new CircleComponent({ color: blue })
        queue.x = -100
        queue.y = 0
        const cancelStream = new CircleComponent({ color: red })
        cancelStream.x = -100
        cancelStream.y = 104
        const arrowQueueToCancel = new ArrowComponent({
            from: { x: queue.x, y: queue.y + 40 },
            to: { x: cancelStream.x, y: cancelStream.y - 40 }
        })
        const arrowInputToQueue = new ArrowComponent({
            from: { x: inputStream.x + 40, y: 0 },
            to: { x: queue.x - 40, y: 0 }
        })
        const processing = new RectComponent({
            color: blue,
            fillColor: red,
        })
        processing.x = 80
        processing.y = 0
        const arrowQueueToProcessing = new ArrowComponent({
            from: { x: queue.x + 40, y: 0 },
            to: { x: processing.x - 70, y: 0 }
        })
        const outputStream = new CircleComponent({ color: red })
        outputStream.x = 246
        outputStream.y = 0
        const arrowProcessingToOutput = new ArrowComponent({
            from: { x: processing.x + 70, y: 0 },
            to: { x: outputStream.x - 40, y: 0 }
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

        const inputTitle = new Text('входящий\nпоток', { fontSize: 24, align: 'center' })
        inputTitle.x = inputStream.x
        inputTitle.y = -62
        inputTitle.scale.set(0.8)
        inputTitle.anchor.set(0.5)

        const cancelTitle = new Text('отказы', { fontSize: 24, align: 'center' })
        cancelTitle.x = cancelStream.x + 80
        cancelTitle.y = cancelStream.y
        cancelTitle.scale.set(0.8)
        cancelTitle.anchor.set(0.5)

        const queueTitle = new Text('очередь', { fontSize: 24, align: 'center' })
        queueTitle.x = queue.x
        queueTitle.y = -62
        queueTitle.scale.set(0.8)
        queueTitle.anchor.set(0.5)

        const processingTitle = new Text('обработка', { fontSize: 24, align: 'center' })
        processingTitle.x = processing.x
        processingTitle.y = -62
        processingTitle.scale.set(0.8)
        processingTitle.anchor.set(0.5)

        const outputTitle = new Text('выходящий\nпоток', { fontSize: 24, align: 'center' })
        outputTitle.x = outputStream.x
        outputTitle.y = -62
        outputTitle.scale.set(0.8)
        outputTitle.anchor.set(0.5)

        this.addChild(
            inputTitle,
            cancelTitle,
            queueTitle,
            processingTitle,
            outputTitle,
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
