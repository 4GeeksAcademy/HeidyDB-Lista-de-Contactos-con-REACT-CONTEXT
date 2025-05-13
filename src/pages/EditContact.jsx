import React from 'react';
import {useParams} from  'react-router-dom';

const EditContact = ()=> {
    const {idContact} = useParams()



   
        return (
        <div>
            <h1>Pagina EditContact con id {idContact}</h1>
        </div>
        )
}
export default EditContact ;

//ahora los "componentes" como EditContact y AddContact 
// van en la seccion pages, porque al final son paginas  que se mostraran 

