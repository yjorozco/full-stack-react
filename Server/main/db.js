const  { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password:'5432123456',
    port: 5432
})

module.export = pool;