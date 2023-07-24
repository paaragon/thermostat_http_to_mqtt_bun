import sql from '@lib/connector';

export async function saveStartup(stationId: string, message: string) {
    const startUp = {
        message,
        station_id: stationId,
    }
    await sql`
        INSERT INTO startup ${sql(startUp, 'message', 'station_id')}
      `
}

export async function saveRead(stationId: string, temperature: number, humidity: number) {
    const read = {
        station_id: stationId,
        temperature,
        humidity,
    }
    await sql`
        INSERT INTO read ${sql(read, 'station_id', 'temperature', 'humidity')}
      `
}

export async function saveStatus(status: number) {
    const statusRecord = {
        status
    }
    await sql`
        INSERT INTO status ${sql(statusRecord, 'status')}
      `
}

export async function saveMode(mode: string) {
    const modeRecord = {
        mode
    }
    await sql`
        INSERT INTO mode ${sql(modeRecord, 'mode')}
      `
}

export async function saveSet(clientId: string, setted: number) {
    const setRecord = {
        client_id: clientId,
        setted
    }
    await sql`
        INSERT INTO setted ${sql(setRecord, 'client_id', 'setted')}
      `
}