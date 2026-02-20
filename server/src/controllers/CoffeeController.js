const { Coffee } = require('../models')

module.exports = {

  // ดูรายการกาแฟทั้งหมด (สำหรับหน้า Index)
  async index (req, res) {
    try {
      const coffees = await Coffee.findAll()
      res.send(coffees)
    } catch (err) {
      res.status(500).send({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
    }
  },

  // เพิ่มเมนูกาแฟใหม่ (รองรับฟิลด์ image)
  async post (req, res) {
    try {
      // req.body จะมีข้อมูล name, price, description และ image (ชื่อไฟล์รูป)
      const coffee = await Coffee.create(req.body)
      res.send(coffee)
    } catch (err) {
      res.status(500).send({ error: 'ไม่สามารถสร้างรายการกาแฟได้' })
    }
  },

  // แก้ไขข้อมูลกาแฟ (รองรับการเปลี่ยนรูปภาพใหม่)
 async put (req, res) {
  try {
    await Coffee.update(req.body, {
      where: { id: req.params.coffeeId }
    })
    res.send(req.body) // ส่งค่าที่ update สำเร็จกลับไป
  } catch (err) {
    res.status(500).send({ error: 'Update failed' })
  }
  },

  // ลบเมนูกาแฟ
  async remove (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)
      if (!coffee) {
        return res.status(403).send({ error: 'ไม่พบข้อมูลกาแฟ' })
      }
      await coffee.destroy()
      res.send(coffee)
    } catch (err) {
      res.status(500).send({ error: 'เกิดข้อผิดพลาดในการลบข้อมูล' })
    }
  },

  // ดูรายละเอียดกาแฟรายตัว
  async show (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)
      res.send(coffee)
    } catch (err) {
      res.status(500).send({ error: 'ไม่พบข้อมูลที่ต้องการ' })
    }
  }
}