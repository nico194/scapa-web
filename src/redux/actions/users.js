import {
    FETCH_USERS_PENDING,
    FETCH_USERS_ERROR,
    USER_SIGNIN_SUCCESS,
    USER_LOGOUT,
} from '../constants/users';
import axiosConfig from '../../configs/axios';

export const signIn = (user) => {
    return dispatch => {
        dispatch({ type: FETCH_USERS_PENDING});
        axiosConfig.post('/admin/auth/sign_in', user)
            .then( response => {
                const user = {
                    id: response.data.data.id,
                    email: response.data.data.email,
                    username: response.data.data.nickname,
                    name: response.data.data.name,
                    accessToken: response.headers['access-token'],
                    client: response.headers.client,
                    uid: response.headers.uid
                }
                const userEncripted = btoa(JSON.stringify(user))
                localStorage.setItem('user', userEncripted)
                return dispatch({ type: USER_SIGNIN_SUCCESS, payload: {user}})
            })
            .catch( error => dispatch({ type: FETCH_USERS_ERROR, payload: {error}}))

    }
}

export const logOut = () => {
    return dispatch => {
        localStorage.setItem('user', JSON.stringify({}))
        dispatch({ type: USER_LOGOUT, payload: { user: {} } })
    }
}