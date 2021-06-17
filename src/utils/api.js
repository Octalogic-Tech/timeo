import axios from "axios";

export const fetchData = () => {
  return axios.get("http://worldtimeapi.org/api/timezone");
};
