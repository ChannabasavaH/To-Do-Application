import mongoose,{ Schema } from 'mongoose'

const TodoSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
})

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;