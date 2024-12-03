import { useState } from 'react';

export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);
    
    const onInputChange = ({target}) => {   // Desestructura el "event" para quedarse con el target
        const {name, value, contrasenya} = target;
        
        setFormState({
            ...formState,
            // Propiedades computadas de los objetos: []. Si la propiedad no existe, generará una nueva.
            [name]: value,
        });
    };

    /*
    const onResetForm = ({target}) => {
        const {username, email, password} = target;
        
        setFormState({
            username: '',
            email: '',
            password: '',
        });
    };
    */

    const onResetForm = () => {
        setFormState(initialForm);
    };


    return {
        ...formState,       // Desestructurar el formState: username, email, password
        formState,
        onInputChange,
        onResetForm,
    }
}