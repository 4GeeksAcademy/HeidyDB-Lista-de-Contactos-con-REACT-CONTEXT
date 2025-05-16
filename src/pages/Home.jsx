
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export const Home = () => {

  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  
  useEffect(() => {
     crearAgenda();
     getContacts();
  }, []);

  function crearAgenda() {
    fetch("https://playground.4geeks.com/contact/agendas/HeidyDB",
       {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([])
    })
      .then(response => {
        if (response.status === 400) {
          console.log("Agenda ya existe, obteniendo contactos...");
          getContacts();
        } else if (!response.ok) {
          throw new Error("Error al crear agenda");
        } else {
          console.log("agenda creada");
          getContacts();
        }
      })
      .catch(error => console.error("Error creando usuario:", error));
  }


  function getContacts() {
    //la URI, el metodo. lleva coma entre la URI y el metodo
    //fetch hace la peticion 
    fetch("https://playground.4geeks.com/contact/agendas/HeidyDB/contacts",
      {
        method: "GET"
      })
      //el metodo GET no lleva ni body ni headers 

      //codigo del status , info en formato json .
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error(`Error al obtener tareas  ${response.status}`);//si el codigo es 400 0 500
        //  enviar error que sera tratado por el catch 
        return response.json(); // sino trae la respuest json convertida a javascript
      })

      //info en formato JavaScript . //  maneja la respuesta si todo va bien (response.ok es un 200)
      .then((data) => {
        console.log(data);
        if (Array.isArray(data.contacts)) { //para garntizar que contacts siempre sea aun array para luego hacerle .map
      
          //AQUI UN CAMBIO MUY GRANDE RESPECTO AL CODIGO ANTERIOR ********* se guarda todo en el store
          dispatch({    // envia los contactos al store.jsx para dese ahi usar en cualquier componentes los datos 
                  type: 'save_contacts', // el caso creado en el store.jsx
                  payload: data.contacts// lista de contactos 
                });
      } else {
        dispatch({    // envia los contactos al store.jsx para dese ahi usar en cualquier componentes los datos 
                  type: 'save_contacts', // el caso creado en el store.jsx
                  payload: [] // lista de contactos 
                });
         }
      })
      //manejo de errores . captura cualquier error 
      .catch(error => {
        console.error("Error:", error);
         dispatch({
          type: 'save_contacts',
          payload: []// Evita que quede undefined
      });
  });
   
 }
const eliminarContacto = (indiceEliminar) => { // esta tarea se quitara con el evento onClick a la X
    const contactoAEliminar = store.contacts[indiceEliminar] ;// aqui esta solo el objeto que voy a eliminar 
    
    console.log("Eliminando contacto con ID:", contactoAEliminar.id, contactoAEliminar);
      fetch(`https://playground.4geeks.com/contact/agendas/HeidyDB/contacts/${contactoAEliminar.id}`,

        {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }, 
      })
      .then((response) => {
         console.log("Código de respuesta:", response.status); // estoy probando si hay error 400 o exito 200
        if (!response.ok) throw new Error("error al eliminar el contacto");
        console.log("Contacto eliminado correctamente");

        //actualiza el store
        const arregloSinContacto = store.contacts.filter((_, index) => index !== indiceEliminar); //se hace un nuevo arreglo
        dispatch({
          type: 'save_contacts',
          payload: arregloSinContacto
        });// actializo el store sin el contacto  
        //con el metodo DELETE no hace falta el segundo .then()
      
      })
      .catch((error) => {
        console.error("Error:", error);
      });
 
    };
  return (
    <div className="text-start">{/* */}

      <div className="container s-flex align-items-center " role="alert" >

        <div className = "row">
          <ul className="list-group  ">
            {/* map recorre el arreglo devolviendo el valor en cada posicion */}
            {store.contacts.map((contact, index) => (
              <li key={index} className="list-group-item 
                  d-flex align-items-start justify-content-between  h-1 d-inline-block">                 

                <div className="col-2" >
                  <img src="https://i.pinimg.com/236x/7b/08/16/7b0816d9d6ecc1bfd5fb1f22cb76e319.jpg" 
                  className="img-thumbnail border border-0 rounded-circle" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}/>
                </div>
             <div className = " col-8 mb-0 fs-9 p-0 ms-3">
                   <div className=" name" ></div>
                    <div className=""> <p>
                    {contact.name}</p></div>

                    <div className="address fw-light mb-0">
                    <p> <i className="fa-solid fa-location-dot me-2"></i>
                    {contact.address}</p></div>

                    <div className="phone fw-light mb-0"> 
                    <p><i className="fa-solid fa-phone me-2"></i> 
                    {contact.phone}</p></div>
                    
                    <div className="email fw-light text-lowercase mb-0">
                    <p><i className="fa-solid fa-envelope  me-2"></i>
                    {contact.email}</p></div>
                     
              </div>      
                
                <div className = "col-2 align-items-end">
                    <button
                       type="button"
                       className="btn btn-sm btn-outline-secondary me-2"
                       aria-label="Edit"
                       onClick ={() => navigate(`/edit-contact/${contact.id}`)}> {/* llamo a useNavigate para ir a la pagina EditContact*/}
                       <i className="fa-solid fa-pencil"></i>
                    </button>

                            {/* borrar el contacto */}
                    <button type="button" className="btn me-2 m-auto" aria-label="Close"
                       onClick = {() =>eliminarContacto(index)}>
                       <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
              </li>

            ))}  { /*  cierro el map, (cuando es codigo java script ponemos entre llaves los comentario ) */}
          </ul>
           
        </div>
 
        <hr className="my-2 border border-ligth" />
        <div className="">{store.contacts.length} contactos agregados a la agenda </div>
      </div>
    </div>


  );
};


export default Home;