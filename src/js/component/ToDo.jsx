import React, {useEffect, useState} from 'react';

export const ToDo = () => {

  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");
  const [isShown, setIsshown] = useState(-1);
  
  let URL = "https://assets.breatheco.de/apis/fake/todos/user/edwindvd"

    const POSTEANDO = {
      method: "POST",
      body: JSON.stringify(taskList),
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    const BORRANDO = {
      method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }

    useEffect(()=>{getApiData()}, [])

    const getApiData= async ()=>{

        let response = await fetch(URL)
        if(response.ok){
            let respuesta = await response.json() // convierte de Json a Objeto de js
            setTaskList(respuesta)
            setTask("")
        }else{
            let addUser = await fetch(URL, POSTEANDO)
                if(addUser.ok){
            console.log("usuario iniciado")
        }}
        return console.log("iniciado")
    }

  const handlerTask = (event) => {
    setTask(event.target.value);
  };

  const handlerKeyPress = async (event) => {
    if (event.key === "Enter" && task != "") {
          setTaskList([...taskList, task]);
          let newList = taskList;
          newList.push({
              label: task,
              done: false
          })

      let response = await fetch(URL,{
        method: "PUT",
        body: JSON.stringify(newList),
        headers: {
          "Content-Type": "application/json"
        }
      })

        if(response.ok){
            let respuesta = await fetch(URL);
            let apiData = await respuesta.json();
            setTaskList(apiData);
            setTask("");
        }else{
            alert("burro")
        }
  }
};
// esta recibiedo una tarea queno me importa como se llame
//   const newTask = (task) =>

  const handlerButtomDelete = async (indexid) =>{

  const filterList = taskList.filter((tarea, index) => index != indexid);
  // factorizando el codigo

      if(filterList.length > 0){
        let response = await fetch(URL, {
    method: "PUT",
    body: JSON.stringify(filterList),
    headers: {
      "Content-Type": "application/json"
    }
  });
      if (response.ok) {
        setTaskList(filterList); 
      } else {
      alert("fuck");
      }
    } else {
      let response = await fetch(URL, BORRANDO);
        if (response.ok) {
          setTaskList([]);
              console.log("se borro todo")
            let createuser = await fetch(URL, POSTEANDO) 
            if(createuser.ok){
              console.log("usuario iniciado");
        }
      } else {
        alert("No sabes o que");
      }
}
}

  //borrando todo
  const handlerDelete = async () =>{
      setTaskList(taskList.length = [])
      let response = await fetch(URL , BORRANDO) 
      if(response.ok){
          console.log("adios a todas")
      }
      let createuser = await fetch(URL, POSTEANDO)
      if(createuser.ok){
          console.log("usuario iniciado")
      }
  }  


  return (
    <div className="row mt-5">
      <div className="col-3"></div>
      <div className="col-6">
        <div className="Card " id="card">
          <div className="form-floating mb-3 form-control border-primary">
            <input
              onChange={handlerTask}
              value={task}
              onKeyDown={handlerKeyPress}
              type="text"
              className="form-control text-primary text-opacity-75"
              id="floatingInput"
              placeholder="Tasks to do"
            />
            <label
              htmlFor="floatingInput"
              className="text-primary text-opacity-50"
            >
              {" "}
              <h6>
              {taskList.length != 0 ? (
                <>Tienes {taskList.length} tareas pendientes</>
              ) : (
                <> No tienes tareas pendientes, agrega una</>
              )}
            </h6>{" "}
            </label>
            {taskList.map((task, i) => {
              return (
                <div className="Card card m-1" key={i} 
                onMouseEnter={()=>{setIsshown(i)}} onMouseLeave={()=>{setIsshown(-100)}}>
                  <div className="modal-header">
                    <h4 className="modal-title text-primary fw-bolder">
                      {" "}
                      {task.label}
                    </h4>
                    { isShown == i &&
                    <button
                      type="button"
                      className="elem btn-close btn-primary"
                      onClick={(event) => handlerButtomDelete(i)}
                    ></button>}
                  </div>
                </div>
              );
            })}
          </div>
          <>
            <button type="button" className='btn-warning' onClick={(event) => handlerDelete()}>
                Borrar todas las tareas
		        </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
