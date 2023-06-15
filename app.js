const path = require('path');
const http = require('http');
const websocket = require('socket.io');
const express = require('express');
const formatmessage = require('./utils/messageformatter');
const userstore = require('./utils/users');

const botname = 'Chat bot';

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

     
    socket.on('joinRoom', ({username, room}) =>{
        //store user data in db
        const user = userstore.UserJoin( socket.id, username, room);

        //join a room 
        socket.join(user.room);

        //welcome current user
        socket.emit('message', formatmessage.formatMessage(botname, `welcome ${user.username}`));

        //show that a user has joined the chat but not the one connecting
        socket.broadcast.to(user.room).emit('message', formatmessage.formatMessage(botname, `${user.username} has joined the chat`) );

    });
   
   
    //listen for client message 
    socket.on('chatMessage', messasge =>{

        const user = userstore.getCurrentUser(socket.id);

        io.to(user.room).emit('message' ,formatmessage.formatMessage(user.username,  messasge));
 
    });


     //run to tell everyone that a user has disconnected
     socket.on('disconnect', () =>{

        const user = userstore.userLeaves(socket.id);
        
        if (user){

            io.to(user.room).emit('message' ,formatmessage.formatMessage(botname,  `${user.username} has left the chat`));

        }

    })

});

server.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}: http://localhost:3000/`);
})