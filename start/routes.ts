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
import User from 'App/Models/User'

Route.get('/', async ({ view }) => {
  return view.render('home/index')
})

Route.group(() => {

  Route.get('/update/:id', 'UsersController.show').as('edit')
  Route.post('/update/:id', 'UsersController.update').as('update')
  Route.get('/create', 'UsersController.create').as('create')
  Route.get('/:id', 'UsersController.show').as('show')

  //Route.get('/', 'UsersController.index').as('index')

  Route.get('/', async ({ view }) => {
    const users = await User.query().paginate(1, 10)
    return view.render('users/index', { users: users.toJSON() })
  }).as('index')

  Route.post('/', 'UsersController.store').as('store')
})
  .prefix('/users')
  .middleware('auth')
  .as('users')

  Route.get('/login', 'AuthController.create').as('auth.create')
  Route.post('/login', 'AuthController.store').as('auth.store')
  Route.get('/logout', 'AuthController.destroy').as('auth.destroy')


Route.get('/admin', ({ view }) => {
  return view.render('admin/index')
})
  .middleware('auth')
  .as('admin.index')
