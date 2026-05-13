
import { Router } from 'express'
import { ProfissionalController }
from '../controllers/profissionalController.js'

const router = Router()

router.get(
  '/',
  ProfissionalController.listar
)

router.post(
  '/cadastro',
  ProfissionalController.cadastrar
)

router.post(
  '/login',
  ProfissionalController.login
)

export default router