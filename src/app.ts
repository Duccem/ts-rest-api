import express, {Application} from 'express';
import path from 'path';
import multer from 'multer';
import cors from 'cors';
import {authRouter, postRouter, commentRouter} from './routes';


export class App {

    private app: Application;
    private storage:multer.StorageEngine | undefined;
    
    constructor(private port?: number | string){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings(): void{
        this.app.set('port', this.port || process.env.PORT || 3000);
        this.storage = multer.diskStorage({//manejador de archivos como imagenes
            destination: path.join(__dirname,'public/img/uploads'),
            filename: (req,file,cb)=>{
                cb(null,new Date().getTime()+path.extname(file.originalname));
            }
        });
    }

    private middlewares(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(cors());
        this.app.use(multer({storage:this.storage}).single('image'));
    }

    private routes(): void{
        this.app.use('/api/auth',authRouter);
        this.app.use('/api/post',postRouter);
        this.app.use('/api/comment',commentRouter);
    }

    public async listen(): Promise<void>{
        await this.app.listen(this.app.get('port'));
        console.log(`[SERVER] running on port ${this.app.get('port')}`);
    }

}
