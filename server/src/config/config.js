module.exports = {
    port: 8081,
    db: {
        database: process.env.DB_NAME || 'coffeeshop',
        user: process.env.DB_USER || 'coffeeshop',
        password: process.env.DB_PASSWORD || 'coffeeshop',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './coffeeshop-db.sqlite'
        }
    },
    // 🔥 เพิ่มส่วนนี้เข้าไปครับ (อย่าลืมเครื่องหมายลูกน้ำ , ข้างบนด้วย)
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}