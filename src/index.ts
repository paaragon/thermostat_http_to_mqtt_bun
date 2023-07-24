
import { Hono } from "hono"
import { API_PORT } from '@config'

// API REQUEST HANDLERS
async function getLatestSettedTemperature() {

}

async function updateSettedTemperature() {

}

async function increaseDecreaseSettedTemperature() {

}

// API DECLARATION
const port = API_PORT || 3000;
const app = new Hono()

app.get("/api/v1/thermostat/temp", getLatestSettedTemperature)
app.post("/api/v1/thermostat/temp", updateSettedTemperature)
app.post("/api/v1/thermostat/temp/<dir>", increaseDecreaseSettedTemperature)

console.log(`Running at http://localhost:${port} `)

export default {
  port: port,
  fetch: app.fetch,
}