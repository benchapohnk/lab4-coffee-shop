<template>
  <div>
    <h1>Create Coffee</h1>

    <form @submit.prevent="createCoffee">
      <div>
        <label>ชื่อเมนู</label><br />
        <input v-model="coffee.name" type="text" required />
      </div>

      <div>
        <label>ราคา</label><br />
        <input v-model.number="coffee.price" type="number" required />
      </div>

      <div>
        <label>ประเภท</label><br />
        <select v-model="coffee.type" required>
          <option value="">-- เลือกประเภท --</option>
          <option value="hot">Hot</option>
          <option value="iced">Iced</option>
          <option value="frappe">Frappe</option>
        </select>
        
        <p>สถานะจำหน่าย:</p>
        <select v-model="coffee.status">
          <option value="available">มีจำหน่าย</option>
          <option value="out of stock">หมด</option>
        </select>
      </div>

      <div class="form-group">
        <label>รูปภาพสินค้า</label>
        <upload-image @uploaded="onUploaded"></upload-image>
        <p v-if="coffee.image">ไฟล์ที่อัปโหลด: {{ coffee.image }}</p>
      </div>

      <div>
        <label>รายละเอียดสินค้า</label><br />
        <ckeditor 
          :editor="editor" 
          v-model="coffee.description" 
          :config="editorConfig">
        </ckeditor>
      </div>

      <br />

      <button type="submit">บันทึกเมนู</button>
      <button type="button" @click="navigateTo('/coffees')">
        ยกเลิก
      </button>
    </form>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
// Import CKEditor และ Upload Component
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadImage from '../Utils/Upload.vue' 

export default {
  components: {
    UploadImage // ลงทะเบียน Component
  },
  data () {
    return {
      // ตั้งค่า CKEditor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ]
      },
      coffee: {
        name: '',
        price: null,
        type: '',
        status: 'available', // กำหนดค่าเริ่มต้น
        description: '',
        image: '' // 3. เพิ่มฟิลด์สำหรับเก็บชื่อไฟล์รูปภาพ
      }
    }
  },
  methods: {
    // 4. ฟังก์ชันรับชื่อไฟล์จาก Component Upload
    onUploaded (filename) {
      this.coffee.image = filename;
    },
    async createCoffee () {
      try {
        // ส่ง data ที่มีทั้งรายละเอียดแบบ HTML และชื่อรูปภาพไปที่ Server
        await CoffeesService.post(this.coffee)
        alert('เพิ่มเมนูกาแฟเรียบร้อย')
        this.$router.show('/coffees')
      } catch (err) {
        console.log(err)
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
/* เพิ่มความสูงให้ Editor เพื่อให้พิมพ์ง่ายขึ้น */
:deep(.ck-editor__editable) {
    min-height: 200px;
}
</style>