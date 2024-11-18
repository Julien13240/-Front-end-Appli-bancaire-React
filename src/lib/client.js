import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';
export async function login(email, password) {
    try {
        const response = await axios.post(`${API_URL}/user/login`, { email, password });
        console.log("Réponse de l'API:", response.data); // Debug
        return response.data.body.token;
    } catch (error) {
        console.error("Erreur lors de l'appel API:", error.response ? error.response.data : error.message);
        throw error;
    }
}


export async function getUserProfile(token) {
    const response = await axios({
        url: `${API_URL}/user/profile`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.body;
}

export const fetchUserProfile = () => async (dispatch) => {
    try {
        const response = await axios({
            url: `${API_URL}/user/profile`,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch({ type: 'FETCH_USER_PROFILE_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_USER_PROFILE_FAILURE', error });
    }
};
