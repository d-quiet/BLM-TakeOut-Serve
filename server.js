const express = require('express')
const router = require('./router/router')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(cors())
// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

app.use('/api', router)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))