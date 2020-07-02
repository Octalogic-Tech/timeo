import axios from 'axios'

export const fetchData = () => {
    return axios.get('https://worldtimeapi.org/api/timezone');
};