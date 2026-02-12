<template>
  <div>
    <h1>User Login</h1>
    <form v-on:submit.prevent="onLogin">
      <p>Email: <input type="text" v-model="email" /></p>
      <p>Password: <input type="password" v-model="password" /></p>
      <p><button type="submit">Login</button></p>
      <div class="error" v-if="error">{{error}}</div>
      <div v-for="coffee in coffees" :key="coffee.id">
    <p>
      <b>{{ coffee.name }}</b> 
      <span :class="coffee.status === 'available' ? 'status-on' : 'status-off'">
        {{ coffee.status === 'available' ? ' [ มีจำหน่าย ] ' : ' [ หมด ] ' }}
      </span>
    </p>
    </div>
    </form>
  </div>
</template>
<style scoped>
.status-on { color: green; font-weight: bold; }
.status-off { color: red; font-weight: bold; }
</style>

<script>
import AuthenService from '../../services/AuthenService' 
import { useAuthenStore } from '../../stores/authen' 

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async onLogin () {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password
        })
        
        const authenStore = useAuthenStore()
        authenStore.setToken(response.data.token)
        authenStore.setUser(response.data.user)

        // ตรวจสอบว่าใน router/index.js คุณตั้งชื่อ route หน้ารายการกาแฟว่า 'coffees' หรือไม่
        this.$router.push({ name: 'coffees' }) 
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    }
  }
}
</script>