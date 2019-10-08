import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/api-rest',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(db => console.log('[DATABASE] Connected'))
.catch(e => console.log('[DATABASE][ERROR]',e));