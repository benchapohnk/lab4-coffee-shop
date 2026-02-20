<template>
  <div>
    <h1>Edit Coffee</h1>

    <div v-if="coffee.id">
      <p>Name: <input v-model="coffee.name" type="text" /></p>
      <p>Price: <input v-model="coffee.price" type="number" /></p>
      <p>
        Type:
        <select v-model="coffee.type">
          <option value="hot">hot</option>
          <option value="iced">iced</option>
          <option value="frappe">frappe</option>
        </select>
      </p>
      
      <p>สถานะจำหน่าย:</p>
      <select v-model="coffee.status">
        <option value="available">มีจำหน่าย</option>
        <option value="out of stock">หมด</option>
      </select>

      <div style="margin: 20px 0;">
        <label>รูปภาพสินค้า:</label><br>
        <div v-if="coffee.image" style="margin-bottom: 10px;">
          <img 
            :src="'http://localhost:8081/assets/uploads/' + coffee.image" 
            style="width: 150px; border-radius: 8px; border: 1px solid #ddd; display: block; margin-bottom: 5px;"
          >
          <p style="font-size: 12px; color: gray;">ไฟล์ปัจจุบัน: {{ coffee.image }}</p>
        </div>
        
        <upload-image @uploaded="onUploaded"></upload-image>
      </div>

      <div>
        <label>รายละเอียดสินค้า (CKEditor):</label>
        <ckeditor 
          :editor="editor" 
          v-model="coffee.description" 
          :config="editorConfig">
        </ckeditor>
      </div>

      <p style="margin-top: 20px;">
        <button @click="updateCoffee">บันทึกการแก้ไข</button>
        <button type="button" @click="$router.push('/coffees')">ยกเลิก</button>
      </p>
    </div>

    <div v-else>Loading...</div>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
import UploadImage from '../Utils/Upload.vue' 
// นำเข้า CKEditor มาใช้ด้วย
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  components: {
    UploadImage
  },
  data () {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ]
      },
      // ประกาศโครงสร้างไว้รอเลยเพื่อป้องกัน Error "cannot read property of null"
      coffee: {
        id: null,
        name: '',
        price: null,
        type: '',
        status: '',
        description: '',
        image: ''
      }
    }
  },

  async created () {
    try {
      const coffeeId = this.$route.params.coffeeId
      this.coffee = (await CoffeesService.show(coffeeId)).data
    } catch (err) {
      console.log(err)
    }
  },
methods: {
    onUploaded (filename) {
      console.log("1. อัปโหลดสำเร็จ ได้ชื่อไฟล์:", filename);
      // ใช้ Object.assign หรือ spread operator เพื่อให้ Vue มั่นใจว่า object coffee มีการเปลี่ยนแปลง
      this.coffee = { ...this.coffee, image: filename };
      console.log("2. ตรวจสอบค่าใน this.coffee.image:", this.coffee.image);
    },

    async updateCoffee () {
      try {
        // ตรวจสอบก่อนส่งว่ามี image ติดไปด้วยไหม
        console.log("3. กำลังส่งข้อมูลไปบันทึก:", this.coffee);
        
        if (!this.coffee.image) {
          alert("คำเตือน: ยังไม่มีชื่อรูปภาพในฐานข้อมูล!");
        }

        await CoffeesService.put(this.coffee)
        alert('แก้ไขข้อมูลเรียบร้อยแล้ว')
        this.$router.push('/coffees')
      } catch (err) {
        console.error("Error during update:", err)
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
      }
    }
  }
}
</script>

<style scoped>
:deep(.ck-editor__editable) {
    min-height: 150px;
}
</style>