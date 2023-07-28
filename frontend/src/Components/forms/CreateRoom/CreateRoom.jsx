import './createroom.css'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';


function CreateRoom({uuid, socket, setUser}) {

    const [roomID, setRoomId] = useState(uuid());
    const [name,setName] = useState("");

    const navigate = useNavigate();

    const createRoomHandler = (e) => {

        e.preventDefault();
         
        const roomData  = {
            name,
            roomID,
            userId: uuid(),
            host: true,
            presenter: true,
        };

        setUser(roomData);
        navigate(`/${roomID}`);
        socket.emit("userJoined", roomData);
        console.log(roomData);
    }

    const copyHandler = () => {
        navigator.clipboard.writeText(roomID);
        toast.info(`Copied to clipboard`);
    }

    return (
        <form className='form cold-md-12 mt-5'>
            <div className='form-group'>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}className='form-control my-2' placeholder='Enter Your Name'/>
            </div>
            <div className='form- border-1'>
             <div className='input-group d-flex align-items-center justify-content-center'>
                <input type="text" value={roomID} className='form-control my-2 border-0' onClick={()=>setRoomId(uuid())} disabled placeholder='Generate Room Code'/>
                <div className='input-group-append'>
                    <button className='btn btn-primary btn-sm me-1' type="button" onClick={() => setRoomId(uuid())}>Generate</button>
                    <button className='btn btn-outline-danger btn-sm me-2' type="button" onClick={()=> copyHandler()}>Copy</button>
                </div>
             </div>
            </div>   
            <button type="submit" onClick={(e)=>createRoomHandler(e)}className='mt-4 btn-primart btn-block form-control'>Generate Room</button>
            
        </form>
    )
}

export default CreateRoom;