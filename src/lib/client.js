import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

const apiClient = axios.create({
    baseURL: API_URL,
});

// Intercepteur pour les erreurs
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Token expiré ou non valide. Veuillez vous reconnecter.");
            alert("Votre session a expiré. Veuillez vous reconnecter.");
            localStorage.removeItem("token");
            window.location.href = "/sign-in";
        }
        return Promise.reject(error);
    }
);

export default apiClient;

// Export des fonctions utilisant apiClient
export async function login(email, password) {
    const response = await apiClient.post('/user/login', { email, password });
    return response.data.body.token;
}

export async function getUserProfile(token) {
    const response = await apiClient.get('/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.body;
}
