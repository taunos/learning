
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class AuthController {

  public async create({ view }: HttpContextContract) {

    return view.render('auth/create')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const { email ,password } = request.only(['email', 'password'])

    await auth.use('web').attempt(email, password)

    return response.redirect().toRoute('admin.index')
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect().toRoute('auth.create')
  }
}
