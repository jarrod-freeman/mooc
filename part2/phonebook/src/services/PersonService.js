import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => {
            return response.data;
        });
};

const create = (person) => {
    return axios.post(baseUrl, person)
        .then(response => {
            return response.data;
        });
};

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => {
            console.log(response);
        });
};

export default { getAll, create, deletePerson };