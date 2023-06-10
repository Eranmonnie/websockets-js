const path = require('path');
const http = require('http');
const socket = require('socket.io');
const express = require('express');

const app =  express();
const server = http.createServer(app);
const io = socket(server);
const PORT = 3000  //|| process.env.PORT  if you have an env file 

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index');
})

io.on('connection', socket =>{
    console.log('connection set');
    socket.emit('message', 'welcome to my chat app');
})

server.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}: http://localhost:3000/`);
})