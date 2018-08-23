//Load express module with `require` directive
let express = require('express')
let app = express()

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello World')
})

//Launch listening server on port 8084
app.listen(8084, function () {
  console.log('App listening on port 8084!')
})