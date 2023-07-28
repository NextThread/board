import './App.css';
import Forms from './Components/forms/forms';
import {Routes, Route} from "react-router-dom"
import RoomPage from './Pages/RoomPage/RoomPage';
import  io from "socket.io-client";
import { useEffect, useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';


const server = "https://drawverse.onrender.com";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};



const socket = io(server, connectionOptions);

function App() {

  //states
  const [user,setUser] = useState({});
  const [users,setUsers] = useState([]);

  useEffect(() => {
    console.log("Updated users list:", users);
  }, [users]);


  useEffect(() => {
    socket.on("userIsJoined",(data)=> {
      if(data.success){
        console.log("user has joined the session");
        setUsers(data.users);
        console.log("userIsJoined: ",users);
      }
      else{
        console.log("user joining error");
      }
    });
    socket.on("allUsers",(data) => {
      setUsers(data);
    });

    socket.on("userJoinedMessageBroadcasted",(data)=> {
      toast.info(`${data} joined the room`);
    });


    socket.on("userLeftMessageBroadcasted",(data)=>{
      console.log("data:" + data);
      toast.info(`${data.name} has left the room`);
      console.log("updated users" + data.updatedUsers);
      setUsers(data.updatedUsers);
      console.log(users);
    });

    return () => {
      socket.off("userIsJoined");
      socket.off("allUsers");
      socket.off("userJoinedMessageBroadcasted");
      socket.off("userLeftMessageBroadcasted");
    };
  
  })

 

  //generating random id
  const uuid = () =>{
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4() 
    );
   };
  return (
   <div className='container'>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Forms uuid={uuid} socket={socket} setUser={setUser}/>} />
      <Route path="/:roomId" element={<RoomPage user={user} socket = {socket} users={users}/>} />
    </Routes>
   </div>
   
  );
}

export default App;
