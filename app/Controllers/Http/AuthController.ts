import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async create({ view }: HttpContextContract) {
    return view.render('auth/create')
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    try{
      await auth.use('web').attempt(email, password)
    }
    catch(e){
      session.flash({ errors: {login: 'blah'}})
      return response.redirect().toRoute('auth.create')
    }

    return response.redirect().toRoute('admin.index')
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect().toRoute('admin.index')
  }
}
