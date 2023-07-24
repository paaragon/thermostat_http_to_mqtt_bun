import postgres from 'postgres'
import { PG_DB, PG_HOST, PG_PASS, PG_PORT, PG_USER } from '@config'

const sql = postgres({
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DB,
    username: PG_USER,
    password: PG_PASS,
})

export default sql