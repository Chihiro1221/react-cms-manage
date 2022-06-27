const express = require('express')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const app = express()

app.use(express.static('./build'))
app.use(cors())
app.use(history())
app.listen(3003, () => {
  console.log('http server running at http://localhost:3003')
})