<template>
  <div>
    <h1>Get All Coffees</h1>
    

    <p>
      <span v-if="isUserLoggedIn">
        <button @click="navigateTo('/coffee/create')">สร้างเมนูกาแฟ</button>
        <button @click="logout">Logout</button>
      </span>

      <span v-else>
        <button @click="navigateTo('/login')">Login</button>
      </span>
    </p>

    <div>จำนวนเมนู {{ coffees.length }}</div>

    <div v-if="coffees.length > 0">
      <div
        v-for="coffee in coffees"
        :key="coffee.id"
        style="margin-bottom: 15px;"
      >
        <div>id: {{ coffee.id }}</div>
        <div>ชื่อเมนู: {{ coffee.name }}</div>
        <div>ราคา: {{ coffee.price }}</div>
        <div>ประเภท: {{ coffee.type }}</div>
        <div>สถานะ: 
          {{ coffee.status === 'available' ? 'พร้อมจำหน่าย' : 'สินค้าหมด' }}
      </div>

        <p>
          <button @click="navigateTo('/coffee/' + coffee.id)">
            ดูรายละเอียด
          </button>

          <span v-if="isUserLoggedIn">
            <button @click="navigateTo('/coffee/edit/' + coffee.id)">
              แก้ไข
            </button>
            <button @click="deleteCoffee(coffee)">
              ลบเมนู
            </button>
          </span>
        </p>
        <hr />
      </div>
    </div>

    <div v-else>
      ยังไม่มีเมนูกาแฟ
    </div>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
// 1. ต้อง Import Store มาด้วย ไม่งั้น logout ไม่ได้
import { useAuthenStore } from '../../stores/authen'

export default {
  data () {
    return {
      coffees: [],
      isUserLoggedIn: false // 2. เพิ่มตัวแปรเช็คสถานะ
    }
  },

  async created () {
    this.refreshData()
    
    // 3. เช็คว่า Login หรือยัง
    const authenStore = useAuthenStore()
    this.isUserLoggedIn = authenStore.isUserLoggedIn
  },

  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },

    async deleteCoffee (coffee) {
      let result = confirm('Want to delete?')
      if (result) {
        try {
          await CoffeesService.delete(coffee)
          this.refreshData()
        } catch (err) {
          console.log(err)
        }
      }
    },

    async refreshData () {
      this.coffees = (await CoffeesService.index()).data
    },

    logout () {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>