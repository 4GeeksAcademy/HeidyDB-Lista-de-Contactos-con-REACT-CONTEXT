

//import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const AddContact = () => {

    const { store, dispatch } = useGlobalReducer()
    function agregarConatactos() {
        dispatch({ type: 'add_contact', payload: {} })
    }



  const guardarContacto = () => { // esta funcion guarda un contacto. y usa el PUT para guardar en la API
    if (tareaNueva.trim() === "") return;
    const tareaEditada = { ...store[editarIndice], label: tareaNueva }
    fetch("https://playground.4geeks.com/contact/agendas/HeidyDB/contacts",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(tareaEditada)
      })
      .then((response) => {
        if (!response.ok) throw new Error(`Error al actualizar la tarea con id ${tareaEditada.id}`);
        return response.json();
      })
      .then((data) => {
        console.log("Tarea sincronizada con la API:", data); 
        const nuevasTareas = [...tareas];
        nuevasTareas[editarIndice] = data;
        setTareas(nuevasTareas); //actualizo el estado 
        setTareaNueva(""); //limpio el input donde edite el texto
        setEditarIndice(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-50">
            <div className="col-md-6 bg-light p-4 rounded shadow">
               
                    <h2 className="text-center" > Add new contact</h2>
                
                <form className="row g-3">

                    <div className="col-md-12">
                        <label htmlFor="inputCity" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="inputName" placeholder="Heidy Diaz" />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label" >Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Email"/>
                    </div>

                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label" >Phone</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Ex: 621 12 34 56" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress2" className="form-label">Address </label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Nombre de la Calle, numero , ciudad, CP..." />
                    </div>

                    <div className="col-12 d-flex justify-content-center ">
                        <button type="submit" className="btn btn-success"
                        onClick = {guardarContacto}> Save </button>

                    </div>
                    <Link className="col-12 d-flex justify-content-center" to="/" > get back to Contact List</Link>   { /* esto lleva a la pagina principal */}


                </form>
            </div>
        </div>
    );
};
export default AddContact;
