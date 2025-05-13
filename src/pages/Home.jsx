import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {

  const [contactoNuevo, setConactoNuevo] = useState(""); //  esta es cada tarea nueva que entra
  const [contact, setContact] = useState([]); //esta es la lista de tareas
  const [editarIndice, setEditarIndice] = useState(null);

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<Link to = "/add-contact" className ="btn bg-primary">Agregar Contacto</Link>
			
         <div className=" contenedor container s-flex align-items-center " role="alert" >



         <div>
          <ul className="list-group mt-3 w-100">
            {/* map recorre el arreglo devolviendo el valor en cada posicion */}
            {contact.map((agenda, index) => (
              <li key={index} className="list-group-item 
                  d-flex justify-content-between align-items-center">           

                  row
				  <img />



                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary me-2"
                    aria-label="Edit">
                   {/* //onClick={() => editar(index)} >*/}
                    <i className="fa-solid fa-pencil"></i>
                  </button>

                  {/* X para cerrar tarea */}
                  <button type="button" className="btn-close me-2 m-auto" aria-label="Close"
                   
                   >
                    </button>
                </li>
			   
            ))}  { /*  cierro el map, (cuando es codigo java script lo ponemos entre llaves) */}
          </ul>
        </div>

        <hr className="my-2 border border-ligth" />
        <div className="">{contact.length} contactos agregados a la agenda </div>
      </div>
    </div>
 
		
	);
}; 
export default Home;