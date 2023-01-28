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
| import './routes/customer''
|
*/
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('layouts/main.edge')
})

Route.get('/users', 'UsersController.index').as('users.index')
Route.get('/users/create', 'UsersController.create').as('users.create')
Route.post('/users', 'UsersController.store').as('users.store')
Route.get('/users/:id', 'UsersController.show').as('users.show')

Route.get('/login', 'AuthController.create').as('auth.create')
Route.post('/login', 'AuthController.store').as('auth.store')
Route.get('/logout', 'AuthController.destroy').as('auth.destroy')

Route.get('/admin', ({ view }) => {
  return view.render('admin/index')
})
  .middleware('auth')
  .as('admin.index')
