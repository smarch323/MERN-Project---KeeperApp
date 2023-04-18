require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// online cyclic instructions
const PORT = process.env.PORT || 8000; 
 


const app = express();
 
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

 
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);

//database connection for cyclic
// const connectDB = async () => {
//   try{
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB Connected: ${conn.connection.host}');
//   } catch(error){
//     console.log(error);
//     process.exit(1);
//   }
// }

const noteSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: [true, 'Please enter a title. No title specified.']
    },
    content: {
        type: String,
        required: [true, 'Please write your content. No content specified.']
    }
});
 
const Note = new mongoose.model("Note", noteSchema);


app.route('/')
.get((req, res) => {
    res.send(`<h1 style='color:gold;position:fixed;top:50%;left:50%;transform:translate(-50%, -50%)'>FallSean In-progress</h1>`)
});
 
app.route('/notes')
.get((req, res) => {
    Note.find().then((foundNotes) => {
    res.send(foundNotes);
    })
    .catch(err => {
        res.send(err);
      })
})
.post((req, res) => {
    const note = new Note ({
        title: req.body.title,
        content: req.body.content
    });
    note.save().then(() => {
            res.json({
                'message': 'New note successfully saved to database'
            });
        })
    });
 
app.delete('/notes/:id', (req, res) => {
    Note.deleteOne(
        {_id: req.params.id}).then(() => {
            console.log(`Successfully deleted item with id: ${req.params.id}.`);
            })
            .catch(err => {
                res.send(err);
              })
});
 
 
 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});




  //Recommended cyclic connection
  // connectDB().then(() => {
  //   app.listen(PORT, () => {
  //     console.log('Listening on port $(PORT)')
  //   })
  // });