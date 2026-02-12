import Api from './Api'

export default {
  index () {
    return Api().get('users')
  },

  show (userId) {
    return Api().get('user/' + userId)
  },

  post (user) {
    return Api().post('user', user)
  },

  put (user) {
    // แก้ตรงนี้ด้วยเผื่อไว้ (ให้รับก้อน user แล้วดึง id เอง)
    return Api().put('user/' + user.id, user)
  },

  delete (user) {
    // ✅ แก้จุดนี้ครับ ดึง .id ออกมาจาก object user
    return Api().delete('user/' + user.id)
  }
}