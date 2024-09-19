import { nanoid } from 'nanoid'

class User {
  static store = new Map()
  static id = 0

  constructor(ws) {
    this.id = ++User.id
    this.ws = ws
    User.store.set(this.id, this)
  }

  static find(id) {
    return User.store.get(parseInt(id))
  }

  static findAll() {
    return User.store.values()
  }

  delete() {
    User.store.delete(this.id)
  }
}

export default User
