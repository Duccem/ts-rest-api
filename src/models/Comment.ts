import {Schema,model, Document} from 'mongoose';

export interface IComment extends Document {
    postId:string,
    userId:string,
    fecha_at?:string,
    comment:string
}

const commentSchema = new Schema({
    comment:{type:String},
    fecha_at:{type:Date,default:Date.now},
    postId:{type:String},
    userId:{type:String}
});

export default model<IComment>('Comment',commentSchema);