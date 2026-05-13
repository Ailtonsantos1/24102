
import express from 'express'
import type { Request, Response } from 'express'
import { db } from '../db/connection.js'
import { profissionais } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export class ProfissionalController {

  static async listar(
    req: Request,
    res: Response
  ) {

    const dados = await db.select()
      .from(profissionais)

    res.json(dados)

  }

  static async cadastrar(
    req: Request,
    res: Response
  ) {

    const {
      nome,
      email,
      senha,
      profissao,
      cidade,
      telefone
    } = req.body

    await db.insert(profissionais).values({
      nome,
      email,
      senha,
      profissao,
      cidade,
      telefone
    })

    res.status(201).json({
      mensagem: 'Profissional cadastrado'
    })

  }

  static async login(
    req: Request,
    res: Response
  ) {

    const { email, senha } = req.body

    const usuario = await db.select()
      .from(profissionais)
      .where(eq(profissionais.email, email))

    if (
      usuario.length === 0 ||
      usuario[0].senha !== senha
    ) {

      res.status(401).json({
        erro: 'Login inválido'
      })

      return
    }

    res.json({
      mensagem: 'Login realizado',
      usuario: usuario[0]
    })

  }

}