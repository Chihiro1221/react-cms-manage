import Axios from "./Axios";

const baseURL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_RPOD_API_URL
const http = new Axios({
  baseURL,
  timeout: 10000,
})

export default http