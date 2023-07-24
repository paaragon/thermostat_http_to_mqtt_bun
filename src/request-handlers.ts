import { getLastMode, getLastSetted, getLastTemp } from "./db/repository";

async function getLatestSettedTemperature() {
    const lastSetted = getLastSetted()
    const lastMode = getLastMode()
    const lastTemp = getLastTemp()

    if (!lastSetted || !lastMode) {
        return {
            "error": true,
            "result": "no last_setted or last_mode"
        }
    }

    return {
        "error": false,
        "result": {
            "temp": lastSetted,
            "mode": lastMode,
            "last": lastTemp,
            "status": lastSetted > lastTemp ? "on" : "off"
        }
    }
}

async function updateSettedTemperature() {

}

async function increaseDecreaseSettedTemperature() {

}