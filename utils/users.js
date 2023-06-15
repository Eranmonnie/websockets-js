//user state

const Users = [];

function UserJoin(id,username, room){
    const user = {id, username, room};
    Users.push(user);
    return user; 
}

//get current user
function getCurrentUser(id){
    const user = Users.find(user => user.id === id);
    return user;
}

//user leaves chat 
function userLeaves(id){
   const index = Users.findIndex(user => user.id === id);

   if (index != -1){

      return Users.splice(index, 1)[0];

    }
  
}

function getRoomUsers(room){
    const users = Users.filter(user=>user.room = room);

    if (users.length !=0){

        return users;

    }
    
}

module.exports = {
    UserJoin,
    userLeaves,
    getRoomUsers,
    getCurrentUser,
}