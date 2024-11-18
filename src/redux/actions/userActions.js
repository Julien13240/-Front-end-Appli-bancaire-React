export const loginRequest = () => ({ type: 'LOGIN_REQUEST' });

export const loginSuccess = (email, token) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            user: { email },
            token,
        },
    };
};

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});

export const logout = () => {
    localStorage.removeItem('token');
    return { type: 'LOGOUT' };
};
