const express = require("express")
const { v4: uuid } = require('uuid')
const cookieParser = require("cookie-parser")
const bcrypt = require('bcrypt')
const app = express()
const jwt = require('jsonwebtoken')
const port = 2222

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

users = []
app.get('/', (req, res) => {
    const payload = { name: "Stefko", age: 2.3, isBeauty: 'yes' }
    const secret = "PecataIStefko"
    const options = {}
    const token = jwt.sign(payload, secret, options)
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

    res.send(token)

})
app.get('/verification/:token', (req, res) => {
    const { token } = req.params
    const verify = jwt.verify(token, "PecataIStefko")
    res.send(verify)
})
app.get('/login', (req, res) => {

    res.send(`

    <h3>Log in </h3>
    <form method="post">
    Username: <input type = "text" name = "username" />
    <p>
    Password: <input type="password" name="pass" />
   </p>
    <input type="submit"/>
</form>
<a href="/register">go to the register </a>
`)
})
app.get('/register', (req, res) => {
    res.send(`
    <h3>Register</h3>
    <form method="post">
    Username: <input type = "text" name = "username" />
    <p>
    Password: <input type="password" name="pass" />
   </p>
    <input type="submit"/>


</form>
<a href="login">go to the log in </a> `)
})
app.post('/register', async (req, res) => {

    const { username, pass } = req.body
    const salt = await bcrypt.genSalt(9)
    const hash = await bcrypt.hash(pass, salt)
    users[username] = { pass: hash }
    res.redirect('/login')
})
app.post('/login', async (req, res) => {
    const { username, pass } = req.body
    const preservHash = users[username]?.pass
    const isValid = await bcrypt.compare(pass, preservHash)
    if (isValid) {
        res.send('Valid')
    } else {
        res.send('Unvalid')
    }
    res.send('ok!')
})

app.listen(port, () => {
    console.log('server is runing');
})