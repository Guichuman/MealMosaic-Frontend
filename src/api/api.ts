import axios from "axios"


export function setUpAPICLient(ctx = undefined){
    const api = axios.create({
        baseURL: "http://localhost:8000"
    
    })

    return api;
}
