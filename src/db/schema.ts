
import {
    mysqlTable,
    int,
    varchar
  } from 'drizzle-orm/mysql-core'
  
  export const profissionais = mysqlTable('profissionais', {
  
    id: int('id').primaryKey().autoincrement(),
  
    nome: varchar('nome', { length: 255 }).notNull(),
  
    email: varchar('email', { length: 255 })
      .notNull()
      .unique(),
  
    senha: varchar('senha', { length: 255 }).notNull(),
  
    profissao: varchar('profissao', {
      length: 255
    }).notNull(),
  
    cidade: varchar('cidade', {
      length: 255
    }).notNull(),
  
    telefone: varchar('telefone', {
      length: 20
    }).notNull(),
  
  })