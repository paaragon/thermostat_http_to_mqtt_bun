
import { API_PORT } from "@config";
import { log } from "@lib/log";
import { Hono } from "hono"
import { initClient } from "./mqtt";

// MQTT
try {
  log.info("Connecting to MQTT server...")
  await initClient()
  log.info("connected")
} catch (e) {
  log.error(e)
  process.exit(1)
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