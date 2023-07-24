import { MQTT_PORT, MQTT_SERVER, MQTT_TOPIC_PREFIX } from '@config'
import * as mqtt from "mqtt"
import { MqttClient } from 'mqtt'


export let client: MqttClient

export async function initClient() {
  client = mqtt.connect(`mqtt://${MQTT_SERVER}:${MQTT_PORT}`)

  await new Promise<void>((res, rej) => {
    client.on('connect', () => res())
    client.on("error", (e: any) => rej(e))
  })
}
