export const loginRequest = () => ({ type: 'LOGIN_REQUEST' });


export const loginSuccess = (userData) => {

    return { type: 'LOGIN_SUCCESS', payload: userData };
};

export const loginFailure = (error) => ({ type: 'LOGIN_FAILURE', payload: error });


export const logout = () => {
    localStorage.removeItem('token');
    return { type: 'LOGOUT' };
};

export const setUserInfo = (email) => {
    return { type: 'PROFILE_SUCCESS', payload: email };
}
