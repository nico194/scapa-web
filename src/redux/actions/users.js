import {
  FETCH_USERS_PENDING,
  FETCH_USERS_ERROR,
  USER_SIGNIN_SUCCESS,
  USER_LOGOUT,
  CLEAR_ERROR,
} from '../constants/users';
import axiosConfig from '../../configs/axios';

export const signIn = (user) => {
  return async dispatch => {
    dispatch({ type: FETCH_USERS_PENDING });
    try {
      const response = await axiosConfig.post('/admin/auth/sign_in', user);
      const userOnLocalStorage = {
        id: response.data.data.id,
        email: response.data.data.email,
        username: response.data.data.nickname,
        name: response.data.data.name,
        accessToken: response.headers['access-token'],
        client: response.headers.client,
        uid: response.headers.uid,
      };
      const userEncripted = btoa(JSON.stringify(userOnLocalStorage));
      localStorage.setItem('user', userEncripted); 
      return dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: { user: userOnLocalStorage },
      });
    } catch (err) {
      return dispatch({
        type: FETCH_USERS_ERROR,
        payload: { err: err.response.data.errors[0] },
      });
    }
  };
};

export const logOut = ({ accessToken, client, uid }) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_PENDING });
    const headers = {
      headers: {
        'access-token': accessToken,
        client,
        uid,
      },
    };
    try {
      const response = await axiosConfig.delete(
        '/admin/auth/sign_out',
        headers
      );
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify({}));
        return dispatch({ type: USER_LOGOUT });
      } else {
        return;
      }
    } catch (err) {
      return dispatch({
        type: FETCH_USERS_ERROR,
        payload: { err: err.response.data.errors[0] },
      });
    }
  };
};

export const clearError = () => (dispatch) => dispatch({ type: CLEAR_ERROR });
