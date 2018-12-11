const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const tokenGuard = require('./middlewares/token-guard');


const db = require('./models/index');
const routers = require('./routers');



const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(cors());

app.use(tokenGuard());
routers(app);



//test=======================================================================
const PdfGeneratorService = require('./services/pdf-generator.service');

app.get('/pdf', (res, req, next) => {
    const serv = new PdfGeneratorService();
    serv.generatePdf('anamnesis');
    next();
});
app.set('views', './views');
app.set('view engine', 'ejs');
//===========================================================================


app.listen(port, () => { console.log(`Server Running on Port ${port}`) });