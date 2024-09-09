import { nanoid } from 'nanoid'

class User {
  static store = new Map()

  constructor(ws) {
    this.id = nanoid(8)
    this.ws = ws
    User.store.set(this.id, this)
  }

  static find(id) {
    return User.store.get(id)
  }

  delete() {
    User.store.delete(this.id)
  }
}

export default User
