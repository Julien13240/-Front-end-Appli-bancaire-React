const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    token: localStorage.getItem('token'),
    error: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, error: null };

        case 'LOGIN_SUCCESS':
            console.log('Login réussi, nouvelle state:', {
                user: action.payload.user,
                token: action.payload.token
            }); // Debug
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token, // Doit recevoir le token correctement ici
            };


        case 'LOGIN_FAILURE':
            return { ...state, error: action.payload };

        default:
            return state;
    }
}
