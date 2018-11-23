const PdfGeneratorService = require('./services/pdf-generator.service');

const createModels = require('./models');
const healthInsuranceRouter = require('./routers/health-insurance.router');
const userRouter = require('./routers/user.router');
const patientsRouter = require('./routers/patients.router');

const tokenGuard = require('./middlewares/token-guard');


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');



const db = createModels();
db.sequelize.sync();
module.exports = db;


const app = express();
const port = 5000;

app.use( express.static('public') );
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'));


app.use(cors());
app.set('views', './views');
app.set('view engine', 'ejs');


app.use('/', userRouter);


app.use(tokenGuard());

app.use('/', patientsRouter);
app.use('/', healthInsuranceRouter);



app.get('/', (req, res, next) => {
    res.end();
});

app.get('/pdf', (res, req, next) => {
    const serv = new PdfGeneratorService();
    serv.generatePdf('anamnesis');
    next();
});



app.listen(port,  () => { console.log(`Server Running on Port ${port}`) });


