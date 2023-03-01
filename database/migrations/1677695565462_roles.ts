import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Role from 'App/Enums/Roles'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.string('description', 255).nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table('roles').insert([
        {
          id: Role.USER,
          name: 'user',
          description: 'System User',
        },
        {
          id: Role.ADMIN,
          name: 'admin',
          description: 'Administrator',
        },
      ])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
