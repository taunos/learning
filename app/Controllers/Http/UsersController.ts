import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import SignUpValidator from 'App/Validators/SignUpValidator'

export default class UsersController {
  public async index({ view }: HttpContextContract) {
    const users = await User.all()

    return view.render('users/index', { users: users })
  }

  public async show({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return view.render('users/update', { user: user })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('users/create')
  }

  public async update({ request, response, params }: HttpContextContract) {

    const user = await User.findOrFail(params.id)

    const { password }  = request.only(['password'])

    user.password = password

    user.save()

    return response.redirect().toRoute('users.show', { id: user.id })
  }

  public async store({ request, response }: HttpContextContract) {
    const {email, password} = await request.validate(SignUpValidator)

    const user = await User.create({ email: email, password: password })

    return response.redirect().toRoute('users.show', { id: user.id })
  }
}
