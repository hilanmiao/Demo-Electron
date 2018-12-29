export class ProgressCircle {
    constructor(percent, radius, elementClass) {
        this._percent = percent
        this._radius = radius
        this._elementClass = elementClass
    }

    get percent() {
        return this._percent
    }

    get radius() {
        return this._radius
    }

    get elementClass() {
        return this._elementClass
    }

    calcDashOffset() {
        let circumference = (Math.PI * (2 * this.radius))
        return Math.floor(circumference - ((this.percent / 100) * circumference))
    }

    createCSS() {
        document.querySelectorAll(`.${this._elementClass} .donut__svg .donut__svg__circle--one`)[0].style.strokeDashoffset = this.calcDashOffset()
    }

    updateText() {
        document.querySelectorAll(`.${this.elementClass} .js-donut-figure`)[0].innerText = this.percent
    }

    updateFigure(newStat) {
        this._percent = newStat
        this.updateText()
        this.createCSS()
    }

    init() {
        this.updateText()

        setTimeout(() => {
            this.createCSS()
        }, 1000)
    }
}
