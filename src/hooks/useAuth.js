import axios from "axios";
import React, { useState } from "react";


export function useAuth(){
    const token = localStorage.getItem('token');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null)

    const login = async (username, password, callback) =>{
        setLoading(true);
        setError(null);
        try{
            const { data } = await axios.post('/seller/login', { username, password })
            if(data.success){
                localStorage.setItem('token', data.token)
                callback();
            }
        } catch(error){
            setError(error.response.data)
            console.log(error.response.data)
        } finally{
            setLoading(false)
            console.log("Error Handler",error)
        }
    }

    const signUp = async () =>{

    }

    return [token, login, signUp, loading, error]
}