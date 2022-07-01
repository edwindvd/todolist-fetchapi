import React, {useState, useEffect} from 'react';

export const ToDo = () => {
    const [taskList, setTaskList] = useState([]);
    const [task, setTask] = useState("");

    useEffect(()=>{
        console.log("fui montado");
        let response = fetch("https://randomuser.me/api")
        
        .then((respuesta)=>{
                
                return respuesta.json()


        }).then((yeison)=>{
                console.log(yeison)
        })
        .catch(()=>{
                console.log("fui rechazado")

        })
        



    } ,[] )







    const handlerTask = (event) => {
        setTask(event.target.value)
    }
    const handlerKeyPress = (event) => {
        // event.preventDefault();

        if(event.key === "Enter") {
        if(task != ""){
            setTaskList([...taskList,task])
            setTask("")
        }
        }
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
                        <label for="floatingInput">Tarea por hacer</label>
                            {
                                taskList.map((tarea, i)=>{
                                    return (
                                        <div className="Card card m-1" key={1}>
                                            <div className="modal-header">
                                                <h4 className="modal-title"> {tarea}
                                                    <button type="button" className="btn-close btn-danger" onClick={(event) => handlerButtomDelete(i)}></button>
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

export default ToDo;
