

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const AddContact = () => {

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // esta funcion flecha visualiza lo que escribo en cada input del formulario 
  const cambiosTexto = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const guardarContacto = () => { // esta funcion guarda un contacto en la API
    fetch("https://playground.4geeks.com/contact/agendas/HeidyDB/contacts", {

      method: "POST", // para crear es POST
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        ...form,
        agenda_slug: "HeidyDB" // dudaaaaaa
      })

    })

      .then(response => {
        if (!response.ok) throw new Error("Error al guardar el contacto");
        return response.json();
        console.log(data);
      })

      .then((data) => {
        console.log("Contacto agregado a la API:", data);
        // Actualiza el contacto en el store
        dispatch({
          type: "save_contacts",
          payload: [...store.contacts, data]
        });
        navigate("/");
      })

      .catch((error) => {
        console.error("Error:", error);
      })
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-50">
      <div className="col-md-6 bg-light p-4 rounded shadow">

        <h2 className="text-center" > Add new contact</h2>

        <form className="row g-3 " 
        onSubmit={(e) => {
          e.preventDefault();  { /* esta fcion evita que se cargue la pagina dos veces */}
          guardarContacto();  
        }}>

          <div className="col-md-12">
            <label htmlFor="inputFullName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="inputName" name="name"
              onChange={cambiosTexto} value={form.name} placeholder="Pepito Perez" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail" className="form-label" >Email</label>
            <input type="email" className="form-control" name="email" id="inputEmail" placeholder="Email"
              value={form.email}
              onChange={cambiosTexto} />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label" >Phone</label>
            <input type="text" className="form-control" name="phone" id="inputAddress"
              value={form.phone}
              onChange={cambiosTexto} placeholder="Ex: 621 12 34 56" />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">Address </label>
            <input type="text" className="form-control" name="address" id="inputAddress"
              value={form.address}
              onChange={cambiosTexto} placeholder="Nombre de la Calle, numero , ciudad, CP..." />
          </div>

          <div className="col-12 d-flex justify-content-center ">
            <button type="submit" className="btn btn-success" > Save </button>

          </div>
          <Link className="col-12 d-flex justify-content-center" to="/" > get back to Contact List</Link>   { /* esto lleva a la pagina principal */}


        </form>
      </div>
    </div>
  );
};
export default AddContact;
