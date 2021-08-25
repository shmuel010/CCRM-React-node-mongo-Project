const express = require('express')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
exports.json = bodyParser.json;

//connect DB
connectDB()

//init Middleware
app.use(express.json({extended: false}))

const PORT = 5000


// define Routes

app.use('/api/users', require("./routes/users"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/contacts", require("./routes/contacts"))

//serve static assets im production
if (process.env.NODE_ENV === 'production') {
    //set a static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${5000}`)
})
