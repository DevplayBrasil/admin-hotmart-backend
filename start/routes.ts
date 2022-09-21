/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/healthz', () => {
  return { result: 'all good!' }
})

Route.get('/hotmart', 'HotmartController.index')

/**
 * Rota para consultar na Hotmart se o email infomado existe. Seguir o seguinte flow:
 * 1. (API) Verificar se o email existe na base de dados da Hotmart
    1. Se o email existir
        1. Verificar se já tem uma senha cadastrada no “Meus Certificados”
            1. Se já tiver → solicitar senha cadastrada/permitir redefinir senha
            2. Se não tiver → solicitar o cadastro de uma senha
    2. Senão
        1. Negar acesso ao sistema
 */
Route.get("/check-email/:email", 'HotmartController.checkEmail')