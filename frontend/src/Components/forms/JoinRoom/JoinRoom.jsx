import './Joinform.css'
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

function JoinRoom({uuid, socket,setUser}) {

    const [roomID,setRoomID] = useState("");
    const [name,setName] = useState("");
    const navigate = useNavigate();

    const JoinRoomHandler = (e) => {
        e.preventDefault();
         
        const roomData  = {
            name,
            roomID,
            userId: uuid(),
            host: false,
            presenter: false,
        };

        setUser(roomData);
        console.log("about to navigate");
        navigate(`/${roomID}`);
        socket.emit("userJoined", roomData);
        console.log(roomData);

    }

    return (
        <form className='form cold-md-12 mt-5'>
            <div className='form-group'>
            <input 
               type="text" 
               className='form-control my-2' 
               placeholder='Enter Your Name'
               value={name}
               onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className='form- border-1'>
             <div className='input-group d-flex align-items-center justify-content-center'>
                <input 
                   type="text" 
                   className='form-control my-2 border-1' 
                   placeholder='Enter Room Code'
                   value={roomID}
                   onChange={(e)=> setRoomID(e.target.value)}
                   />
             </div>
            </div>   
            <button 
              type="submit" 
              className='mt-4 btn-primart btn-block form-control'
              onClick={(e)=>JoinRoomHandler(e)}>Join Room</button>
            
        </form>
    )
}

export default JoinRoom;