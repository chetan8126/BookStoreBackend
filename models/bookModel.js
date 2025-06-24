import mongoose from "mongoose";

const  bookSchema = new mongoose.Schema(
    {
        title:{type: String,required: [true,'Title is required'], minlength: [3, 'Title must be at least 3 characters long'], maxlength:[25,'Cannot be longer than 25 character'],
},
        author:{ type: String, required:[ true,'Author is required'], minlength: [3, 'Author name must be at least 3 characters long'],maxlength:[25,'Cannot be longer than 25 character'],},
        genre:{ type: String, required: [true,'Genre is required']},
        publishedDate:{type: Date,required: [true,'Publication year is required'], min: [1800, 'Publication year must be later than 1800'],
    max: [new Date().getFullYear(), `Publication year cannot be later than the current year`],
},
    }
);
const Book = mongoose.model('Book', bookSchema);
export default Book;