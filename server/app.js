const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());  /* 解决跨域问题 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// user
app.use('/health', require('./route/user/health'));


//admin


app.listen(port, () => console.log(`> Running on localhost:${port}`))