

//import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const AddContact = () => {

    const { store, dispatch } = useGlobalReducer()
    function agregarConatactos (){
        dispatch({type: 'add_contact', payload: {}})
    }

    return (

        <form className="row g-3">

            <div className="col-md-6">
                <label htmlFor="inputCity" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="inputName"/>
            </div>
            <div className="col-md-6">
                <label htmlFor ="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4" />
            </div>

            <div className="col-12">
                <label htmlFor ="inputAddress" class="form-label">Phone</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <div className="col-12">
                <label htmlFor ="inputAddress2" class="form-label">Address 2</label>
                <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
            </div>

            <div className="col-12">
                <button type="submit" class="btn btn-primary">Save</button>
                <Link to ="/" > get back to Contact</Link>
            </div>
        </form>
    );
};
export default AddContact;
