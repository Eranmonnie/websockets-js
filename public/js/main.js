const chatmessage = document.getElementById("message-box");

// get user name and room from query string
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

//socket connection
const socket = io();

//log in to room
socket.emit("joinRoom", {
  username,
  room,
});

//  gat all users in rooms data

socket.on("roomUsers", ({ room, users }) => {
  outputRoom(room);
  outputUsers(users);
});

socket.on("message", (message) => {
  addtodom(message);

  //scroll down
  chatmessage.scrollTop = chatmessage.scrollHeight;
});

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  message = e.target.elements.msg.value;

  //emit message to serve

  socket.emit("chatMessage", message);

  //clear form data
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function addtodom(message) {
  const div = document.createElement("div");
  //add condition if its users message to add flex start to div

  div.innerHTML = `${
    message.username == username
      ? `
    <div class="flex justify-end mb-6 text-xs">

    <div class='bg-[#007bff] p-3 rounded-full rounded-tr-none hover:bg-blue-700 transition text-white text-md'> 
    <p class=''> ${message.message}</p>
    <div class=' text-[10px] flex justify-between'>  <span>${message.username}</span>  <span>${message.time}</span> </div>  
    </div>

    </div>`
      : `<div class="flex justify-start mb-6 text-xs">

    <div class='bg-[#007bff] p-3 rounded-full rounded-tl-none hover:bg-blue-700 transition text-white text-md'> 
    <p class=''> ${message.message}</p>
    <div class=' text-[10px] flex justify-between'>  <span>${message.username}</span>  <span>${message.time}</span> </div>  
    </div>

    </div>`
  }`;

  document.getElementById("message-box").appendChild(div);
}

function outputRoom(room) {
  const roomname = document.getElementById("roomname");
  roomname.innerHTML = `<div class="text-white">${room}</div>`;
}
function outputUsers(users) {
  const room = document.getElementById("users");

  room.innerHTML = `${users
    .map(
      (user) => `<li class='mt-2 p-2 text-black text-xs'>${user.username}</li>`
    )
    .join("")}`;
}
