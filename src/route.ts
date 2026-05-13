
// HOME
app.get('/', (req: Request, res: Response) => {

    res.send('API Freelancer Obras')
  
  })
  
  // LISTAR PROFISSIONAIS
  app.get(
    '/profissionais',
    ProfissionalController.listar
  )
  
  // BUSCAR POR ID
  app.get(
    '/profissionais/:id',
    ProfissionalController.buscarPorId
  )
  
  // CADASTRAR
  app.post(
    '/profissionais/cadastro',
    ProfissionalController.cadastrar
  )
  
  // LOGIN
  app.post(
    '/profissionais/login',
    ProfissionalController.login
  )
  
  // ATUALIZAR
  app.patch(
    '/profissionais/:id',
    ProfissionalController.atualizar
  )
  
  // DELETAR
  app.delete(
    '/profissionais/:id',
    ProfissionalController.deletar
  )
  