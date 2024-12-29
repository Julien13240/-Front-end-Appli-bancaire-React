import axios from "axios";

const API_URL = 'http://localhost:3001/api/v1';

// Action pour la gestion de la connexion
export const loginRequest = () => ({ type: "LOGIN_REQUEST" });

export const loginSuccess = (data) => ({
    type: "LOGIN_SUCCESS",
    payload: data,
});

export const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
});

export const logout = () => (dispatch) => {
    // Suppression du token du stockage local
    localStorage.removeItem("token");

    // Réinitialisation de l'état utilisateur
    dispatch({ type: "USER_LOGOUT" });
};


// Action de connexion (login)
export const login = (credentials) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        const response = await axios.post(
            API_URL + "/user/login",
            credentials
        );

        const { token, user } = response.data.body;

        // Sauvegarde du token dans le localStorage
        localStorage.setItem("token", token);

        // Envoi des données utilisateur dans le store Redux (userReducer)
        dispatch(loginSuccess({ token, user }));
    } catch (error) {
        dispatch(
            loginFailure(
                error.response ? error.response.data.message : error.message
            )
        );
    }
};

// Récupération du profil utilisateur
export const fetchUserProfile = () => async (dispatch, getState) => {
    const { token } = getState().user;

    try {
        const response = await axios.get(
            API_URL + "/user/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response)
        dispatch({
            type: "FETCH_USER_PROFILE_SUCCESS",
            payload: response.data.body,
        });
    } catch (error) {
        dispatch({
            type: "FETCH_USER_PROFILE_FAILURE",
            error: error.response ? error.response.data.message : error.message,
        });
    }
};

// Mise à jour du profil utilisateur
export const updateUserProfile = (updatedData) => async (dispatch, getState) => {
    const { token } = getState().user;

    try {

        await axios.put(
            API_URL + "/user/profile",
            updatedData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({
            type: "UPDATE_USER_PROFILE_SUCCESS",
            payload: updatedData.userName,
        });
    } catch (error) {

        dispatch({
            type: "UPDATE_USER_PROFILE_FAILURE",
            error: error.response ? error.response.data.message : error.message,
        });
    }
};
