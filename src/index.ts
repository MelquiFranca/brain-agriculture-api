import { Client } from "pg"
import { PostgresDatabase } from "./infra/database/postgres/postgres.database"
import app from "./infra/server"
import routes from "./infra/server/routes"
import { logger } from "./shared/logger"

(async () => {
  try {
    const client = new Client()
    await client.connect()
    const database = new PostgresDatabase(client)
    const port = process.env?.PORT || 3005
    routes(app, database)
    app.listen(port, () => console.log(`Running in port ${port}`))
    process.addListener('SIGTERM', async () => {
      console.log('TESTE')
      await client.end()
    })
  } catch (error) {
    logger.log('error', 'MainApplication', error)
    process.exit(1)
  }
})()