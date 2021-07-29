import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

class Timer {
    secondsPassed = 0
    constructor() {
        makeAutoObservable(this)
    }
    increase() {
        this.secondsPassed += 1
    }
    decrease() {
        this.secondsPassed -= 1
    }
    reset() {
        this.secondsPassed = 0
    }
}
const myTimer = new Timer()
export default myTimer
