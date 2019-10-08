import express, {Application} from 'express';
import authRoute from './routes/auth';

const app:Application = express();

//settings
app.set('port',3000);

//midlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use('/api/auth',authRoute);

export default app;