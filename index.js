const express = require('express');
const path = require('path');


const PORT = process.env.port || 8000

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


app.get('/', (req,res)=>{
    res.render('index', {title: "Mini Message Board", messages: messages})
})

app.get('/:id', (req, res)=>{
    console.log(req.params.id)
    const message = messages.find((x)=>x.id == req.params.id);
    res.render('view', {message: message});
})

app.post('/new', (req,res)=>{
    const messageUser = req.body.messageUser
    const messageText = req.body.messageText
    messages.push({id: messages.length+1, text: messageText, user: messageUser, added: new Date() });
    res.redirect('/');
})



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})