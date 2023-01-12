import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async index({ view }: HttpContextContract){
    const users = await User.all()

    return view.render('users/index', { users: users})
  }

  public async show({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return view.render('users/show', {user: user})
  }
}
