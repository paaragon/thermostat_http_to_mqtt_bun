import { MQTT_PORT, MQTT_SERVER, MQTT_TOPIC_PREFIX } from "@config"
import { log } from "@lib/log"
import * as mqtt from "mqtt"

export async function init() {
    log.info('Connecting to MQTT server...')
    const client = mqtt.connect(`mqtt://${MQTT_SERVER}:${MQTT_PORT}`)
    
    client.on('connect', () => {
      log.info('Connected')
      log.info('Suscribing...')
      client.subscribe(`${MQTT_TOPIC_PREFIX}/#`)
    })
}
