const socket = io();
socket.on('message', message =>{
        console.log(message);
        addtodom(message);
})

const form = document.getElementById('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    message = e.target.elements.msg.value;

   //emit message to serve 
   socket.emit('chatMessage', message);

})

function addtodom(message){
    const div = document.createElement('div');
    //add condition if its users message to add flex start to div
 
    div.innerHTML = `
    <div class="flex justify-end mb-6">

    <div class='bg-gray-500 px-3 py-2 rounded-full rounded-tr-none'> 
    ${message}
    </div>
    
    </div>`

    
    document.getElementById('message-box').appendChild(div);
}