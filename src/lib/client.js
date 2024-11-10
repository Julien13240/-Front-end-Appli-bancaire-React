import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

export async function login(email, password) {
    const response = await axios.post(`${API_URL}/user/login`, { email, password });

    return response.data.body.token;
}

export async function getUserProfile(token) {
    const response = await axios({
        url: `${API_URL}/user/profile`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`

        }
    })

    return response.data.body
}