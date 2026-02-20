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
        style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;"
      >
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          
          <div v-if="coffee.image && coffee.image !== ''">
            <img 
              :src="'http://localhost:8081/assets/uploads/' + coffee.image" 
              style="width:60px; height:60px; border-radius:50%; object-fit:cover; margin-right:15px; border: 2px solid #ddd;"
              @error="onImgError" 
            >
          </div>
          
          <div v-else style="width:60px; height:60px; border-radius:50%; background:#ccc; margin-right:15px; display:flex; align-items:center; justify-content:center; font-size:10px; color:#666;">
            No Pic
          </div>

          <div>
            <div style="font-weight: bold; font-size: 1.1em;">{{ coffee.name }}</div>
            <div style="color: #888; font-size: 0.8em;">ID: {{ coffee.id }}</div>
            
            <div v-if="coffee.image" style="font-size: 10px; color: green;">
              File in DB: {{ coffee.image }}
            </div>
            <div v-else style="font-size: 10px; color: red;">
              สถานะ: ยังไม่ได้อัปโหลดรูป/ไม่ได้บันทึกชื่อไฟล์
            </div>
          </div>
        </div>

        <div style="margin-left: 75px;">
          <div>ราคา: {{ coffee.price }} บาท</div>
          <div>ประเภท: {{ coffee.type }}</div>
          <div>สถานะ: {{ coffee.status === 'available' ? 'พร้อมจำหน่าย' : 'สินค้าหมด' }}</div>

          <p>
            <button @click="navigateTo('/coffee/' + coffee.id)">ดูรายละเอียด</button>
            <span v-if="isUserLoggedIn">
              <button @click="navigateTo('/coffee/edit/' + coffee.id)">แก้ไข</button>
              <button @click="deleteCoffee(coffee)" style="color: red;">ลบเมนู</button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div v-else>ยังไม่มีเมนูกาแฟ</div>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
import { useAuthenStore } from '../../stores/authen'

export default {
  data () {
    return {
      coffees: [],
      isUserLoggedIn: false
    }
  },

  async created () {
    this.refreshData()
    const authenStore = useAuthenStore()
    this.isUserLoggedIn = authenStore.isUserLoggedIn
  },

  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },

    // ฟังก์ชันจัดการถ้ารูปในโฟลเดอร์หายไป หรือ Path ผิด
    onImgError(event) {
      event.target.src = "https://via.placeholder.com/60?text=Error";
    },

    async deleteCoffee (coffee) {
      let result = confirm('คุณต้องการลบเมนูนี้ใช่หรือไม่?')
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
      try {
        const response = await CoffeesService.index()
        this.coffees = response.data
      } catch (err) {
        console.log(err)
      }
    },

    logout () {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.isUserLoggedIn = false
      this.$router.push({ name: 'login' })
    }
  }
}
</script>