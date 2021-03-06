const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());  /* 解决跨域问题 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/health', require('./route/health'));
app.use('/user', require('./route/user'));
app.use('/service', require('./route/service'));
app.use('/conf', require('./route/conf'));
app.use('/notice', require('./route/notice'));

app.listen(port, () => console.log(`> Running on localhost:${port}`))