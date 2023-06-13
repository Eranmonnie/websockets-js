const chatmessage = document.getElementById('message-box');

const socket = io();

socket.on('message', message =>{

    console.log(message);
    addtodom(message);
        
   //scroll down 
   chatmessage.scrollTop = chatmessage.scrollHeight;

})

const form = document.getElementById('form');

form.addEventListener('submit', (e)=>{

    e.preventDefault();

    message = e.target.elements.msg.value;

   //emit message to serve

   socket.emit('chatMessage', message);

   //clear form data 
   e.target.elements.msg.value = '';
   e.target.elements.msg.focus();
   
});


function addtodom(message){
    const div = document.createElement('div');
    //add condition if its users message to add flex start to div
 
    div.innerHTML = `
    <div class="flex justify-end mb-6 text-xs">

    <div class='bg-gray-500 px-5 py-2 rounded-full rounded-tr-none'> 
    <p class='mb-1'> ${message.username}</p>
        <p class='mb-2'> ${message.message}</p>
        <p class='w-full flex justify-end'> ${message.time}</p>
    </div>

    </div>`

    document.getElementById('message-box').appendChild(div);
}