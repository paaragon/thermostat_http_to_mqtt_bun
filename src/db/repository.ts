import sql from '@lib/connector'

export async function getLastSetted(): Promise<number> {
    const [row] = await sql<{ setted: number }[]>`
        SELECT setted FROM setted order by date desc LIMIT 1
    `

    return +row?.setted
}

export async function getLastTemp(): Promise<number> {
    const [row] = await sql<{ temperature: number }[]>`
        SELECT temperature FROM read order by date desc LIMIT 1
    `

    return +row?.temperature
}

export async function getLastMode(): Promise<number> {
    const [row] = await sql<{ mode: number }[]>`
        SELECT mode FROM mode order by date desc LIMIT 1
    `

    return row?.mode
}
