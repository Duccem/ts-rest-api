import dotenv from 'dotenv';
import app from './app';
import './database';

function main(){
    app.listen(app.get('port'));
    console.log(`[SERVER] running on port ${app.get('port')}`);
}

main();
