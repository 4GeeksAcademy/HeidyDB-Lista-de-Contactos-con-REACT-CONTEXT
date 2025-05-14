import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const EditContact = () => {

   // const [contactoNuevo, setConactoNuevo] = useState(""); //  esta es cada tarea nueva que entra
   // const [contact, setContact] = useState([]); //esta es la lista de tareas
    const [editarIndice, setEditarIndice] = useState(null);
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const { idContact } = useParams()

   // setConactoNuevo(contact[index].name); // carga el texto al input. solos reemplazo 

  //  setEditarIndice(index); // marca qué tarea se está editando


    return (
        <div>
            <h1>Pagina EditContact con id {idContact}</h1>



            <div className="container-fluid d-flex justify-content-center align-items-center min-vh-50">
            <div className="col-md-6 bg-light p-4 rounded shadow">
               
                    <h2 className="text-center" > Edit contact</h2>
                
                <form className="row g-3">

                    <div className="col-md-12">
                        <label htmlFor="inputCity" className="form-label">Full Name</label>
                        <input type="text" class="form-control" id="inputName"  />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label" >Email</label>
                        <input type="email" className="form-control" id="inputEmail" />
                    </div>

                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label" placeholder="Phone">Phone</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Ex: 621 12 34 56" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress2" className="form-label">Address </label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Nombre de la Calle, numero , ciudad, CP..." />
                    </div>

                    <div className="col-12 d-flex justify-content-center ">
                        <button type="submit" className="btn btn-success
                        onClick ">Save</button>

                    </div>
                    <Link className="col-12 d-flex justify-content-center" to="/" > get back to Contact List</Link>   { /* esto lleva a la pagina principal */}


                </form>
            </div>
        </div>




        </div>






    )
}
export default EditContact;

//ahora los "componentes" como EditContact y AddContact 
// van en la seccion pages, porque al final son paginas  que se mostraran 

