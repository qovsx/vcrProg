class TimeFormatter {
    format(value: number) {
        const hours = Math.floor(value / (1000 * 60 * 60))
        const hMs = hours * 60 * 60 * 1000
        const minutes = Math.floor((value - hMs) / (1000 * 60))
        const mMs = minutes * 60 * 1000
        const seconds = Math.floor((value - hMs - mMs) / (1000))

        const strH = hours.toString().padStart(2, '0')
        const strM = minutes.toString().padStart(2, '0')
        const strS = seconds.toString().padStart(2, '0')

        return `${strH}:${strM}:${strS}`
    }
}

const timeFormatter = new TimeFormatter()

export default timeFormatter
