import Axios from "./Axios";


const http = new Axios({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
})

export default http