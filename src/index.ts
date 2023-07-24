
import { API_PORT, AUTH_PASS, AUTH_USER } from "@config";
import { log } from "@lib/log";
import { Hono } from "hono"
import { initClient } from "./mqtt";
import { getLatestSettedTemperature, increaseDecreaseSettedTemperature, updateSettedTemperature } from './request-handlers';
import { basicAuth } from 'hono/basic-auth'
import { logger } from 'hono/logger'

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

app.use('*', logger())
app.use("*", basicAuth({
  username: AUTH_USER,
  password: AUTH_PASS,
}))
app.get("/api/v1/thermostat/temp", getLatestSettedTemperature)
app.post("/api/v1/thermostat/temp", updateSettedTemperature)
app.post("/api/v1/thermostat/temp/:dir", increaseDecreaseSettedTemperature)

console.log(`Running at http://localhost:${port} `)

export default {
  port: port,
  fetch: app.fetch,
}