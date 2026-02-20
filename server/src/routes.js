// src/routes.js

const CoffeeController = require('./controllers/CoffeeController')
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')

//upload
const coffeeUpload = require('./middleware/coffeeUpload')
// 1. ⭐ เรียกยามมาใช้งาน (Import Middleware)
const isAuthenController = require('./controllers/isAuthenController')

module.exports = (app) => {

    // ===============================
    // Users Routes
    // ===============================
    // ปกติ User ก็ควรกันครับ แต่ถ้าตามโจทย์เน้น Coffee ก่อนก็ได้
    app.get('/users', isAuthenController, UserController.index)   // กันไม่ให้คนนอกดูรายชื่อ User
    app.get('/user/:userId', UserController.show) 
    app.post('/user', UserController.create) 
    app.put('/user/:userId', UserController.put) 
    app.delete('/user/:userId', UserController.remove) 


    // ===============================
    // Coffee Routes (โจทย์บทที่ 9)
    // ===============================
    // ดูเมนู (GET) -> ปล่อยโล่ง (Public) ให้ลูกค้าดูได้
    app.get('/coffees', CoffeeController.index)        
    app.get('/coffee/:coffeeId', CoffeeController.show) 

    // 2. ⭐ เอายามไปเฝ้า (POST, PUT, DELETE) -> ต้อง Login ก่อนถึงจะทำได้
    app.post('/coffee', isAuthenController, CoffeeController.post)       // เพิ่มเมนู
    app.put('/coffee/:coffeeId', isAuthenController, CoffeeController.put) // แก้ไขเมนู
    app.delete('/coffee/:coffeeId', isAuthenController, CoffeeController.remove) // ลบเมนู

    // ===============================
    //  Routes Login
    // ===============================
    app.post('/login', UserAuthenController.login)
    app.post('/register', UserAuthenController.register)
    
    // เพิ่ม route สำหรับรับการอัปโหลด
app.post('/coffee-upload', coffeeUpload, (req, res) => {
    res.send({ filename: req.file.filename })
})

}