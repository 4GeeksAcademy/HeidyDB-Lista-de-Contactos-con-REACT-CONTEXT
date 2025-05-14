
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export const Home = () => {

  const [contactoNuevo, setConactoNuevo] = useState(""); //  esta es cada contacto nuevo que entra
  const [editarIndice, setEditarIndice] = useState(null);
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const editar = () => {
    // puedes poner lógica aquí antes de navegar
    navigate("/edit-contact");
  };


   useEffect(() => {
    crearAgenda();
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
          getTodos();
        } else if (!response.ok) {
          throw new Error("Error al crear agenda");
        } else {
          console.log("agenda creada");
          getTodos();
        }
      })
      .catch(error => console.error("Error creando usuario:", error));
  }


  function getTodos() {
    //la URI, el metodo. lleva coma entre la URI y el metodo
    //fetch hace la peticion 
    fetch("https://playground.4geeks.com/contact/agendas",
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
      
          //AQUI UN CAMBIO MUY GRANDE RESPECTO AL CODIGO ANTERIOIR ********* se guarda todo en el store
          dispatch({    // envia los contactos al store.jsx para dese ahi usar en cualquier componentes los datos 
                  type: 'save_contacts', // el caso creado en el store.jsx
                  payload: data.contacts // ista de contactos 
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
    <div className="text-center mt-5">{/* este boton de abajo lleva a la pagina AddContact  */}

      <div className=" contenedor container s-flex align-items-center " role="alert" >

        <div>
          <ul className="list-group mt-3 w-100">
            {/* map recorre el arreglo devolviendo el valor en cada posicion */}
            {store.contacts.map((agenda, index) => (
              <li key={index} className="list-group-item 
                  d-flex justify-content-between align-items-center">
           
                    {agenda.name}

                <div calssName="col-m-3  " >
                  <img src="" />
                </div>

                <div calssName="col-m-5  " >
                  <div clasName="name"><p>{agenda.name}</p></div>
                  <div clasName="address"><p> {agenda.address}</p></div>
                  <div clasName="phone"><p> {agenda.phone}</p></div>
                  <div clasName="email"><p> {agenda.email}</p></div>
                </div>

               <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary me-2"
                  aria-label="Edit"
                  onClick ={editar} > {/* llamo a useNavigate para ir a la pagina EditContact*/}
                  <i className="fa-solid fa-pencil"></i>
                </button>

                {/* X para cerrar tarea */}
                <button type="button" className="btn-close me-2 m-auto" aria-label="Close"
                  onClick = {() =>eliminarContacto(index)}>
                  <i class="fa-solid fa-trash"></i>
                </button>
              </li>

            ))}  { /*  cierro el map, (cuando es codigo java script lo ponemos entre llaves) */}
          </ul>
        </div>

        <hr className="my-2 border border-ligth" />
        <div className="">{store.contacts.length} contactos agregados a la agenda </div>
      </div>
    </div>


  );
};
}

export default Home;