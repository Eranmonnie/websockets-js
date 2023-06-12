const socket = io();
socket.on('message', message =>{
        console.log(message);
})

const form = document.getElementById('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    message = e.target.elements.msg.value;

   //emit message to serve 
   socket.emit('chatMessage', message);

})