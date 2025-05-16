import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const EditContact = () => {

  const { id } = useParams(); // id del contacto desde la URL
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [indiceEditar, SetIndiceEditar] = useState ([]);
  const contacto = store.contacts.find(c => c.id === parseInt(id));
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: ""
  });

  useEffect(() => {
    if (contacto) {
      setForm({
        name: contacto.name,
        email: contacto.email,
        address: contacto.address,
        phone: contacto.phone
      });
    }
  }, [contacto]);


  const cambiosTexto = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const guardarEdicion = () => { // esta funcion guarda despues de modificar una tarea. y usa el PUT para guardar en la API
  
    const contactoEditado = { ...store.contacts[indiceEditar], name: store.contacts.name }
    fetch(`https://playground.4geeks.com/contact/agendas/HeidyDB/contacts/${contacto.id}`),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          agenda_slug: "HeidyDB" 
        })

      }
        .then((response) => {
          if (!response.ok) throw new Error(`Error al guardar el contacto con id ${contacto.id}`);
          return response.json();
        })
        .then((data) => {
          console.log("contacto sincronizado con la API:", data);
          // Actualiza el contacto en el store
          const nuevosContactos = store.contacts.map(c =>
            c.id === parseInt(id) ? { ...c, ...data } : c
          );
          dispatch({ 
            type: "save_contacts",
             payload: nuevosContactos
             });
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    if (!contacto) return <div>Contacto no encontrado</div>;
    return (
      <div>
        <h1>  Pagina EditContact con id {id}</h1>

        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-50">
          <div className="col-md-6 bg-light p-4 rounded shadow">

            <h2 className="text-center" > Edit contact</h2>

            <form className="row g-3">

              <div className="col-md-12">
                <label htmlFor="inputCity" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="inputName"
                  onchange={cambiosTexto()}
                  name="name"
                  value={form.name} />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label" >Email</label>
                <input type="email" className="form-control" id="inputEmail"
                  onchange={cambiosTexto()}
                  name="email"
                  value={form.email} />
              </div>

              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label" placeholder="Phone">Phone</label>
                <input type="text" className="form-control" id="inputAddress"
                  onchange={cambiosTexto()}
                  name="phone"
                  value={form.phone} />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">Address </label>
                <input type="text" className="form-control" id="inputAddress"
                  onchange={cambiosTexto()}
                  name="address"
                  value={form.address} />
              </div>
                        
              <Link className="col-12 d-flex justify-content-center" to="/" > get back to Contact List</Link>   { /* esto lleva a la pagina principal */}
              <button className="col-12 d-flex btn btn-success justify-content-center" to="/" onclick={guardarEdicion}> Save</button>

            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default EditContact;

//ahora los "componentes" como EditContact y AddContact 
// van en la seccion pages, porque al final son paginas  que se mostraran 

