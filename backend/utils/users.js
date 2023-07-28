const users = [];

// Add a user to the list

const addUser = ({ name, userId, roomID, host, presenter, socketId }) => {
  const user = { name, userId, roomID, host, presenter, socketId };
  users.push(user);
  return users.filter((user) => user.roomID === roomID);
};

// Remove a user from the list

const removeUser = (id) => {
  const index = users.findIndex((user) => user.socketId === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
  return users;
};

// Get a user from the list

const getUser = (id) => {
  return users.find((user) => user.socketId === id);
};

// get all users from the room

const getUsersInRoom = (roomId) => {
  return users.filter((user) => user.roomId === roomId);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
