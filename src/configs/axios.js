import axios from 'axios'

console.log('env url', process.env.REACT_APP_API_URL)
const instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers:{            
            'Content-Type': 'application/json',
        }
    });    
    
export default instance;