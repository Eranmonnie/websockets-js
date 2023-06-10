const path = require('path');
const http = require('http');
const websocket = require('socket.io');
const express = require('express');

const app =  express();
const server = http.createServer(app);
const io = websocket(server);
const PORT = 3000  //|| process.env.PORT  if you have an env file 

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('login');
})

app.get('/chat', (req, res)=>{
    res.render('index');
})

io.on('connection', socket =>{
   
    //welcome current user
    socket.emit('message', 'welcome to my chat app');

    //show that a user has joined the chat but not the one connecting
    socket.broadcast.emit('message', 'a user has joined the chat');

    //run to tell everyone that a user has disconnected

    socket.on('disconnect', () =>{
        io.emit('message', 'a user has disconnected');
    })
})

server.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}: http://localhost:3000/`);
})