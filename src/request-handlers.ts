import { Context, Next } from 'hono';
import { getLastMode, getLastSetted, getLastTemp } from "./db/repository";
import { client } from './mqtt';
import { MQTT_TOPIC_PREFIX } from './config';

interface SettedTemperatureReq {
    petitioner: string;
    temp: number;
    mode: string;
}

interface IncreaseDecreaseSettedTemperatureReq {
    petitioner: string;
}

export async function getLatestSettedTemperature(c: Context) {
    const lastSetted = await getLastSetted()
    const lastMode = await getLastMode()
    const lastTemp = await getLastTemp()

    if (!lastSetted || !lastMode) {
        return c.json({
            "error": true,
            "result": "no last_setted or last_mode"
        })
    }

    console.log(lastSetted, lastTemp, lastSetted > lastTemp)

    return c.json({
        "error": false,
        "result": {
            "temp": lastSetted,
            "mode": lastMode,
            "last": lastTemp,
            "status": lastSetted > lastTemp ? "on" : "off"
        }
    })
}

export async function updateSettedTemperature(c: Context) {
    const body = await c.req.json<SettedTemperatureReq>()
    const { petitioner = "grafana", temp, mode } = body

    if (temp) {
        client.publish(`${MQTT_TOPIC_PREFIX}/set/${petitioner}`, temp.toString())
    }

    if (mode) {
        client.publish(`${MQTT_TOPIC_PREFIX}/setmode/${petitioner}`, mode.toString())
    }

    return c.json({
        error: false,
        msg: "ok"
    })
}

export async function increaseDecreaseSettedTemperature(c: Context) {
    const body = await c.req.json<IncreaseDecreaseSettedTemperatureReq>()
    const { petitioner = "grafana" } = body
    const dir = c.req.param("dir")

    const lastSetted = await getLastSetted()
    const direction = dir === "inc" ? 1 : -1
    const temp = lastSetted + direction

    if (temp) {
        client.publish(`${MQTT_TOPIC_PREFIX}/set/${petitioner}`, temp.toString())
    }

    return c.json({
        error: false,
        msg: "ok"
    })
}