import React, {useEffect, useState} from 'react';

export const ToDo = () => {

    const [taskList, setTaskList] = useState([]);
    const [task, setTask] = useState("");
    const [isShown, setIsshown] = useState(-1);
    
    useEffect(()=>{

        console.log("fui montado");
        let response = fetch("https://randomuser.me/api")

        .then ((respuesta)=>{

        return respuesta.json() // convierte de Json a Objeto de js

        }).then((yeison)=>{

            console.log(yeison)
        })
        .catch(()=>{

            console.log("fui rechazado")
        })
    } , [] )

    const handlerTask = (event) => {
        setTask(event.target.value)
    }

    const handlerKeyPress = (event) => {

        // event.preventDefault();
        if(event.key === "Enter" && task != ""){
            const tarea = {
                label: task,
                done: false,
            }
            setTaskList([...taskList,task])
            setTask("")
        }
    }

    const newTask = (task) => {

    }

const handlerButtomDelete = (indexid) => setTaskList(taskList.filter((tarea , index) => (index != indexid)));
// factorizando el codigo

return (
    <div className='row mt-5'>
        <div className='col-3'></div>
            <div className='col-6'>
                <div className='Card' id="card">
                    <div className="form-floating mb-3">
                        <input onChange={handlerTask} value={task} onKeyDown={handlerKeyPress} type="text" className="form-control" id="floatingInput" placeholder="Tasks to do"/>
                        <label htmlFor="floatingInput">Tarea por hacer</label>
                            {
                                taskList.map((tarea, i)=>{
                                    return (
                                        <div className="Card card m-1" key={`s-${i}`}>
                                            <div className="modal-header" onMouseEnter={()=>{setIsshown(i)}} onMouseLeave={()=>{setIsshown(-100)}} >
                                                <h4 className="modal-title" key={i}> {tarea}
                                                    { isShown == i &&
                                                        <button type="button" className="btn-close btn-danger" key={`p-${i}`} onClick={(event) => handlerButtomDelete(i)}></button>}
                                                </h4>
                                            </div>
                                        </div>
                                            )
                                })
                            }
                    </div>
                </div>
            </div>
    </div>
)
}