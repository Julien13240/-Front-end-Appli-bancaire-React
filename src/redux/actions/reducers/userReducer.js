// userReducer.js
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

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };

        case 'USER_LOGOUT':
            return initialState;

        case 'LOGIN_FAILURE':
            return { ...state, error: action.payload };

        case "UPDATE_USER_PROFILE_SUCCESS":
            return {
                ...state,
                user: { ...state.user, userName: action.payload },

            };
        default:
            return state;
    }
}

