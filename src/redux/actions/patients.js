import { 
    FETCH_PATIENTS_PENDING,
    FETCH_PATIENTS_ERROR,
    FETCH_PATIENTS_SUCCESS,
    LINK_PATIENT_SUCCESS,
    FETCH_PATIENT_SUCCESS,
    CHANGE_VOICE_ASSISTANT_PENDING,
    CHANGE_VOICE_ASSISTANT,
    UNLINK_PATIENT_SUCCESS,
  } from '../constants/patients';
import config from '../../config';

export const getPatientById = (id) => {
    return dispatch => {
        dispatch({ type: FETCH_PATIENTS_PENDING });
        fetch(`${config.server}/users/${id}`, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => response.json())
        .then( patient => {
            dispatch({ type: FETCH_PATIENT_SUCCESS, payload: {patient: patient[0]}})}
        )
        .catch( err => dispatch({ type: FETCH_PATIENTS_ERROR, payload: {err}}));
    }
}

export const getPatientsByTutor = (id) => {
    return dispatch => {
        dispatch({ type: FETCH_PATIENTS_PENDING });
        fetch(`${config.server}/users/tutor/${id}`, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => response.json())
        .then( patients => dispatch({ type: FETCH_PATIENTS_SUCCESS, payload: {patients}}))
        .catch( err => dispatch({ type: FETCH_PATIENTS_ERROR, payload: {err}}));
    }
}

export const unlinkPatient = (id) => {
    return dispatch => {
        dispatch({ type: FETCH_PATIENTS_PENDING });
        fetch(`${config.server}/users/tutor/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tutor_id: 9 })
        })
        .then( response => response.json())
        .then( data => {
            console.log('data update:', data);
            dispatch({ type: UNLINK_PATIENT_SUCCESS, payload: {id} })
        })
        .catch( err => dispatch({ type: FETCH_PATIENTS_ERROR, payload: {err}}))
    }
}

export const changeVoiceAssistant = patient => {
    return dispatch => {
        dispatch({type:CHANGE_VOICE_ASSISTANT_PENDING})
        fetch(`${config.server}/users/voice/${patient.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ voice: patient.voice })
        })
        .then( response => response && dispatch({type: CHANGE_VOICE_ASSISTANT, payload: {patient}}))
        .catch( err => dispatch({ type: FETCH_PATIENTS_ERROR, payload: {err}}))
    }
}