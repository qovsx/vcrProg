import GraphicsApp from 'core/GraphicsApp'
import './css/main.css'
import './css/style.css'
import { Ticker } from '@pixi/ticker'
import Scheme1 from 'schemes/scheme1/Scheme1'
import Scheme1Manager from 'schemes/scheme1/Scheme1Manager'
import { Now, TWEEN } from 'tween-es'
import InputManager from 'InputManager'

const canvas1 = document.getElementById('cvs1') as HTMLCanvasElement
const canvas2 = document.getElementById('cvs2') as HTMLCanvasElement

const cancel1 = document.getElementById('cancel_1') as HTMLElement
const lostProfit1 = document.getElementById('lost_profit_1') as HTMLElement

const cancel2 = document.getElementById('cancel_2') as HTMLElement
const lostProfit2 = document.getElementById('lost_profit_2') as HTMLElement

const startButton = document.getElementById('start_button') as HTMLButtonElement

const mainTicker = new Ticker()

const gApp1 = new GraphicsApp(canvas1)
const scheme1 = new Scheme1(cancel1, lostProfit1)
const scheme1Manager = new Scheme1Manager(scheme1)
gApp1.stage.addChild(scheme1)

const gApp2 = new GraphicsApp(canvas2)
const scheme2 = new Scheme1(cancel2, lostProfit2)
const scheme2Manager = new Scheme1Manager(scheme2)
gApp2.stage.addChild(scheme2)

let t = 0
Now.get = () => t
mainTicker.add(() => {
    const deltaTime = mainTicker.deltaMS
    t += deltaTime
    TWEEN.update(t)
    gApp1.render()
    gApp2.render()
})
mainTicker.start()

startButton.addEventListener('click', () => {
    scheme1Manager.setData(InputManager.getValues(1))
    scheme2Manager.setData(InputManager.getValues(2))
    scheme1Manager.start()
    scheme2Manager.start()
})
