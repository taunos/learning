import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories/UserFactory'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'

test.group('users', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()
  })

  test('create an user', async ({ assert, client }) => {

    const email = faker.internet.email().toLowerCase()
    const password = faker.internet.password(10, true, /[A-Z]/)

    const response = await client
      .post(`/users`).basicAuth('admin@admin.com', '123')
      .form({
        email: email,
        password: password,
        passwordConfirm: password,
      })

    response.assertStatus(200)

    const user = await User.findBy('email', email)

    assert.isNotNull(user)
    assert.equal(user?.email, email)
  })

  test('edit an user', async ({ client }) => {

    const user = await UserFactory.create()
    const password = faker.internet.password(10, true, /[A-Z]/)

    const response = await client
      .post(`/users/update/${user.id}`).basicAuth('admin@admin.com', '123')
      .form({
        password: password,
        passwordConfirm: password
      })

    response.assertStatus(200)

    })

  test('display welcome page', async ({ client }) => {
    const response = await client.get('/')

    response.assertStatus(200)
  })

})
