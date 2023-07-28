import { useState, useRef, useEffect } from "react";
import './RoomPage.css'
import Canvas from "../../Components/Canvas/Canvas";
import Chat from "../../Components/chat/Chat";

function RoomPage({user,socket,users}) {


    const canvas = useRef(null);
    const ctx=useRef(null);
    const [count,setCount] = useState(users);
    const [tool,setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);
    const [openUserTab,setOpenUserTab] = useState(false);
    const [openChatTab, setOpenChatTab] = useState(false);

    useEffect(() => {
      setCount(users);

    })

   
    const handleCanvasClear = () => {
      const canvasRef = canvas.current;
      if(canvasRef){
        const ctxRef = canvasRef.getContext("2d");
      ctxRef.fillRect = "white";
      ctxRef.clearRect(0,0,canvas.current.width, canvas.current.height);
      setElements([]); 
      }
    };

    const undoHandler = () => {

      //add last element to history
      setHistory((prev) =>[
        ...prev,
        elements[elements.length-1],
      ]);

      //remove last element from elements
      setElements((prev)=> 
      prev.slice(0,prev.length-1));
    }

    const redoHandler = () => {

      setElements((prev)=>[
        ...prev,
        history[history.length-1]
      ]);
     
      setHistory((prev)=> 
      prev.slice(0,prev.length-1));
     

    }

   

    return(
        <div className="room">
          <button 
            type="button" 
            onClick={() => setOpenUserTab(true)} 
            className="btn btn-dark w-10" 
            style={{display:"block", position:"absolute", top:"5%", left:"5%", height:"40px"}}
            >Users</button>

            <button 
            type="button" 
            onClick={() => setOpenChatTab(true)} 
            className="btn btn-primary w-20" 
            style={{display:"block", position:"absolute", top:"5%", left:"12%", height:"40px"}}
            >Chat</button>
          {
            openUserTab && (
              <div className="position-fixed top-0 h-100 text-white bg-dark " style={{width:"250px",left:"0%"}}>

                <button 
                  type="button" 
                  onClick={() => setOpenUserTab(false)} 
                  className="btn btn-light btn-block w-100 mt-5"
                  >Close</button>

                <div className="w-100 mt-5 pt-5">
                {
                  users.map((usr,index) =>(
                    <p key={index*999} className="my-2 text-center w-100">{usr.name} {user && user.userId === usr.userId && "(You)" }</p>
                  ))
                }
                </div>
              </div>
            )
          }
          {
            openChatTab && (<Chat setOpenChatTab={setOpenChatTab} socket={socket}/>)
          }
            <h1 className="text-center py-4">
                <span className="d-inline-block">
                     WHITE BOARD SHARING{" "}
                  <span className="text-primary">[Users Online: {users?.length}]</span>
                </span>
            </h1>

            {user && user.presenter && (
                <div className="col-md-10 mx-auto px-5 mt-3 mb-5 d-flex align-items-center justify-content-center">
              <div className="d-flex col-md-2 justify-content-center gap-1">
                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="pencil">Pencil</label>
                    <input type="radio" className='mt-1' checked={tool==="pencil"} name='tool' id="pencil" value="pencil" onChange={(e)=>setTool(e.target.value)}/>
                </div>

                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="line">Line</label>
                    <input type="radio"className='mt-1'checked={tool==="line"} name='tool' id="line" value="line" onChange={(e)=>setTool(e.target.value)}/>
                </div>

                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="rect">Rectangle</label>
                    <input type="radio" className='mt-1'checked={tool==="rect"} name='tool' id="rect" value="rect" onChange={(e)=>setTool(e.target.value)}/>
                </div>
                
               
              </div>
              <div className='col-md-3 mx-auto'>
                <div className="d-flex  align-items-center justify-content-center">
                    <label htmlFor='color'>Select Color:</label>
                    <input type='color' id='color' className='mt-1 ms-3' value={color} onChange={(e) => setColor(e.target.value)}/>
                </div>
              </div>
              <div className="col-md-3 d-flex gap-2">
            <button 
               className="btn btn-primary mt-1"
               disabled={elements.length===0}
               onClick = {()=> undoHandler()}
              >Undo</button>
            <button 
               className="btn btn-outline-primary mt-1"
               disabled={history.length===0}
               onClick = {()=>redoHandler()}
              >Redo</button>
              </div>
              <div className="col-md-3">
                <button className="btn btn-danger" onClick={handleCanvasClear}>Clear</button>
              </div>
            </div>
              )
            }
           

            <div className="col-md-10 border canvas-box">
                <Canvas 
                  canvasRef={canvas} 
                  ctxRef={ctx} 
                  elements={elements}
                  setElements={setElements}
                  tool={tool}
                  color={color}
                  user={user}
                  socket={socket}
                />
            </div>
        </div>
    );
}

export default RoomPage;