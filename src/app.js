const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const routers = require('./routers');
const tokenGuard = require('./middlewares/token-guard');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(cors());
dotenv.load();

app.use(tokenGuard());
routers(app);



const port = process.env.SERVER_PORT;



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


app.listen(process.env.PORT || port, () => { 
    console.log(`Server Running ${process.env.NODE_ENV === 'production' ? '(in production)' : ''}${ port ? 'on Port ' + port : ''}`);
});