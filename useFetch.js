
import { useState, useEffect } from 'react';


const localCache = {};

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,    
    });
    
    useEffect(() => {
        getFetch();

    }, [url]);  // Cuando la url cambia, vuelve a hacer la petición getFetch()

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        });
    };
    
    
    const getFetch = async() => {

        if(localCache[url]) {
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            });

            return;
        }

        setLoadingState();

        const resp = await fetch(url);

        if(!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                }
            });

            return; // Evitará que continue ejecutándose el código
        }

        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        });

        // Manejo del caché
        localCache[url] = data;


    };


    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }
}