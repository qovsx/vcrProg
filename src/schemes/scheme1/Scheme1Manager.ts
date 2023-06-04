import Person from 'schemes/Person'
import Scheme1 from './Scheme1'
import { Tween } from 'tween-es'

export interface IData {
    processingTime: number
    inputStream: number
    maxWaiting: number
    workingTime: number
    price: number
}

const currencyFormatter = new Intl.NumberFormat('RU-ru')

const rangeFloat = (min: number, max: number) => min + Math.random() * (max - min)
const rangeInt = (min: number, max: number) => Math.floor(rangeFloat(min, max))

export default class Scheme1Manager {
    private scheme: Scheme1

    private tProcessing = 6
    private fullStream = 103
    private workingTime = 8
    private price = 200
    private m = 10

    private personArray: Person[] = []

    private fullTime = 0
    private _tweenRef: Tween<any> | null = null

    constructor(scheme: Scheme1) {
        this.scheme = scheme
    }

    public setData(data: IData) {
        this.tProcessing = data.processingTime
        this.fullStream = data.inputStream
        this.m = Math.ceil(data.maxWaiting / data.processingTime) || 1
        this.workingTime = data.workingTime
        this.price = data.price
    }

    public start() {
        if (this.fullStream > 0) {
            this.generatePerson(
                this.generateSpawnTimes()
            )
    
            const lastPerson = this.personArray[this.personArray.length - 1]
            this.fullTime = lastPerson.absoluteSpawnTime + lastPerson.waitingTime + this.tProcessing
            this.fullTime = Math.ceil(this.fullTime)
    
            if (this._tweenRef) this._tweenRef.stop()
    
            this._tweenRef = new Tween({ t: 0 })
                .to({ t: this.fullTime }, 10_000)
                .onUpdate(({ t }) => {
                    this.update(t)
                })
                .start()
        }
    }

    private generateSpawnTimes() {
        const tSpawn = this.workingTime / this.fullStream
        const spawnArr: number[] = Array(this.fullStream).fill(tSpawn)
        spawnArr.forEach((el, index, arr) => {
            const randomIndex = rangeInt(0, arr.length)
            const randomPart = rangeFloat(0.4, 0.6)
            const self = el * randomPart
            const remainder = el - self
            arr[index] = self
            arr[randomIndex] += remainder
        })
        for (let i = 0; i < spawnArr.length; i++) {
            spawnArr[i] -= spawnArr[0]
        }
        return spawnArr
    }

    private generatePerson(spawnArr: number[]) {
        this.personArray.length = 0
        const arr = this.personArray
        for (let i = 0; i < this.fullStream; i++) {
            const spawnTime = spawnArr[i] * 60
            const person = new Person()
            person.spawnTime = spawnTime
            if (i === 0) {
                person.absoluteSpawnTime = spawnTime
            } else {
                person.absoluteSpawnTime = arr[i - 1].absoluteSpawnTime + spawnTime
            }
            let prevWaitingTime = 0
            let deltaSpawnTime = 0
            for (let j = i - 1; j >= 0; j--) {
                if (!arr[j].isCancel) {
                    prevWaitingTime = arr[j].waitingTime
                    deltaSpawnTime = person.absoluteSpawnTime - arr[j].absoluteSpawnTime
                    break
                }
            }
            if (i === 0) {
                person.waitingTime = 0
                person.absoluteSpawnTime = spawnTime
            } else {
                const prevTime = prevWaitingTime + this.tProcessing
                person.waitingTime = Math.max(prevTime - deltaSpawnTime, 0)
                person.absoluteSpawnTime = arr[i - 1].absoluteSpawnTime + spawnTime
            }
            person.queueIndex = Math.ceil(person.waitingTime / this.tProcessing)
            if (person.queueIndex > this.m) {
                person.isCancel = true
            }
            arr[i] = person
        }
    }

    private update(timeInMinutes: number) {
        const time = timeInMinutes
        let input = 0
        let queue = 0
        let cancel = 0
        let processing = 0
        let output = 0
        this.personArray.forEach((person) => {
            const timeToProcessingStart = person.absoluteSpawnTime + person.waitingTime
            const timeToProcessingEnd = timeToProcessingStart + this.tProcessing
            const timeToSpawn = person.absoluteSpawnTime

            if (timeToSpawn <= time) {
                if (person.isCancel) {
                    cancel++
                } else
                if (timeToProcessingEnd <= time) {
                    output++
                } else
                if (timeToProcessingStart <= time) {
                    processing = (time - timeToProcessingStart) / this.tProcessing
                } else {
                    queue++
                }
            } else {
                input++
            }
        })

        const model = {
            inputStream: input,
            queue: queue,
            cancelStream: cancel,
            processing: processing,
            outputStream: output,
        }

        this.scheme.inputStream.count = model.inputStream
        this.scheme.queue.count = model.queue
        this.scheme.cancelStream.count = model.cancelStream
        this.scheme.outputStream.count = model.outputStream
        this.scheme.processing.fillCoefficent = model.processing

        this.scheme.htmlElementProcessed.innerText = model.outputStream.toString(10)
        this.scheme.htmlElementProfit.innerText = currencyFormatter.format(
            model.outputStream * this.price
        )

        this.scheme.htmlElementCancel.innerText = model.cancelStream.toString(10)
        this.scheme.htmlElementLostProfit.innerText = currencyFormatter.format(
            model.cancelStream * this.price
        )

        this.scheme.update(timeInMinutes * 60 * 1000)
    }
}
