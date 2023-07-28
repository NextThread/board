import './forms.css'

import CreateRoom from './CreateRoom/CreateRoom';
import JoinRoom from './JoinRoom/JoinRoom';
const Forms = ({uuid,socket,setUser}) => {

    return (
       <div className='row h-100 pt-5'>
        <div className="col-md-4 form-box p-3 border border-2 rounded-2 mx-auto d-flex flex-column align-items-center">
            <h1 className='text-primary fw-bold'>Create Room</h1>
            <CreateRoom uuid={uuid} socket={socket} setUser={setUser}/>
        </div>
        <div className="col-md-4 p-3 border border-2 rounded-2 mx-auto d-flex flex-column align-items-center">
            <h1 className='text-primary fw-bold'>Join Room</h1>
            <JoinRoom socket={socket} setUser={setUser} uuid={uuid}/>

        </div>
       </div>
    );
}

export default Forms;