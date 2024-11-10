const initialState = {
    isAuthenticated: !!localStorage.getItem('token'), // Check si un token existe déjà
    user: null,
    token: localStorage.getItem('token'),
    error: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, error: null };
        case 'LOGIN_SUCCESS':

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case 'LOGIN_FAILURE':
            return { ...state, error: action.payload };
        case 'PROFILE_SUCCESS':
            localStorage.setItem('username', action.payload.email); // Sauvegarder le nom d'utilisateur mis à jour

            return { ...state, user: { username: action.payload.email } };
        case 'LOGOUT':
            localStorage.removeItem('token'); // Supprimer le token à la déconnexion
            localStorage.removeItem('username'); // Supprimer le nom d'utilisateur à la déconnexion
            return { isAuthenticated: false, user: { username: "" }, token: null, error: null };
        default:
            return state;
    }
}
