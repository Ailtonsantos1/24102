import 'dotenv/config'

import mysql from 'mysql2/promise'

import { drizzle }
from 'drizzle-orm/mysql2'

/* =====================================================
   ENV VARIABLES
===================================================== */

const DB_HOST: string = process.env.DB_HOST || 'localhost'

const DB_PORT: number = Number(
  process.env.DB_PORT || 3307
)

const DB_USER: string = process.env.DB_USER || 'root'

const DB_PASSWORD: string =
  process.env.DB_PASSWORD || 'catolica'

const DB_NAME: string =
  process.env.DB_NAME || 'freelancer_obras'

/* =====================================================
   MYSQL POOL
===================================================== */

const pool = mysql.createPool({

  host: DB_HOST,

  port: DB_PORT,

  user: DB_USER,

  password: DB_PASSWORD,

  database: DB_NAME,

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0,

})

/* =====================================================
   DRIZZLE ORM
===================================================== */

export const db = drizzle(pool)

/* =====================================================
   TEST DATABASE
===================================================== */

export async function conectarBanco() {

  try {

    const connection = await pool.getConnection()

    console.log(
      '✅ Banco conectado com sucesso'
    )

    connection.release()

  } catch (error) {

    console.error(
      '❌ Erro ao conectar no banco'
    )

    console.error(error)

  }

}