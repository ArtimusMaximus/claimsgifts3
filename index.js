import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import res from 'express/lib/response';

const app = express();
const PORT = 4000;
const router = express.Router();

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//body parser setup

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'))

router.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.get('/', (req, res) => 
    res.send(`Node & Express running on PORT ${PORT}.`)
);


app.post('/', (req, res) => {
    res.send('????????')
})

app.listen(PORT, () => 
    console.log(`Your server is running on PORT ${PORT}.`)
);


