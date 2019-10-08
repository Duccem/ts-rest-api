import {Schema,model, Document} from 'mongoose';

export interface IPost extends Document {
    title?: string,
    image?: string,
    path:string,
    description?: string,
    userId:string
}

const postSchema = new Schema({
    title:{type:String},
    image:{type:String},
    description:{type:String},
    path:{type:String},
    userId:{type:Schema.Types.ObjectId}
});

export default model<IPost>('Post',postSchema);