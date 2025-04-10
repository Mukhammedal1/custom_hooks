import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.77.231.30:3003/todo",
});

export default instance;
