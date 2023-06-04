const clamp = (value: number, min = 0, max = 1) => (
    Math.min(Math.max(value, min), max)
)

export default class InputManager {
    public static getValues(id: 1 | 2) {
        const inputProcessingTime = document.getElementById(`processing_time_${id}`) as HTMLInputElement
        const inputInputStream = document.getElementById(`input_stream_${id}`) as HTMLInputElement
        const inputMaxWaiting = document.getElementById(`max_waiting_${id}`) as HTMLInputElement
        const inputWorkingTime = document.getElementById(`working_time_${id}`) as HTMLInputElement
        const inputPrice = document.getElementById(`price_${id}`) as HTMLInputElement

        return {
            processingTime: this.getValidInputValue(inputProcessingTime),
            inputStream: this.getValidInputValue(inputInputStream),
            maxWaiting: this.getValidInputValue(inputMaxWaiting),
            workingTime: this.getValidInputValue(inputWorkingTime, 1),
            price: this.getValidInputValue(inputPrice),
        }
    }

    private static getValidInputValue(input: HTMLInputElement, min = 0, max = Infinity) {
        const value = clamp(+input.value, min, max)
        input.value = value.toString(10)
        return value
    }
}