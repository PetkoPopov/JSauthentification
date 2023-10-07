const express = require("express")
const { v4: uuid } = require('uuid')
const cookieParser = require("cookie-parser")
const app = express()
const port = 2222

app.use(cookieParser())
app.get('/', (req, res) => {
    //
    // const cookie = req.headers["cookie"]
// console.log({cookies:req.cookies},{id})
    // let id 
    // if (cookie) {
    //     const [key, value] = cookie.split("=")
      
    //     id=value
    //     res.header('Set-Cookie', `userId=${id}`)
    // } else {
    //      id = uuid()
    //     res.header('Set-Cookie', `userId=${id}`)
    
    res.send('OK !')

})


app.listen(port, () => {
    console.log('server is runing');
})