<template>
  <div>
    <div class="upload-priview" v-if="pictures.length">
      <img :src="pictures[0]" alt="preview" style="width:200px; margin-bottom:10px;">
    </div>

    <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" />
    <button type="button" @click="uploadFile" :disabled="!selectedFile">Upload Image</button>
  </div>
</template>

<script>
import UploadService from '../../services/UploadService'

export default {
  data() {
    return {
      selectedFile: null,
      pictures: [] // เก็บ URL สำหรับ Preview
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.selectedFile = file
        // สร้าง URL สำหรับ Preview รูปทันที
        this.pictures = [URL.createObjectURL(file)]
      }
    },
    async uploadFile() {
      if (!this.selectedFile) return

      const formData = new FormData()
      formData.append('image', this.selectedFile)

      try {
        const response = await UploadService.upload(formData)
        // เมื่ออัปโหลดสำเร็จ ส่งชื่อไฟล์กลับไปที่ CreateCoffee.vue
        this.$emit('uploaded', response.data.filename)
        alert('อัปโหลดรูปภาพสำเร็จ')
      } catch (err) {
        console.error(err)
        alert('เกิดข้อผิดพลาดในการอัปโหลด')
      }
    }
  }
}
</script>