import Axios from 'axios';
import { URL, GET_PROFILE } from './helpers'

export const getProfile = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(URL + '/profile/' + localStorage.getItem('id'))
            dispatch({ type : GET_PROFILE, payload : res.data  })
        } catch (err) {
            console.log(err ? err.response.data : err)
        }
    }
}

export const editProfile = (body) => {
    return async (dispatch) => {
        try {
            const res = await Axios.patch(URL + '/profile/edit/' + localStorage.getItem('id'), body)
            console.log(res.data)

            //update data redux
            const result = await Axios.get(URL + '/profile/' + localStorage.getItem('id'))
            dispatch({ type : GET_PROFILE, payload : result.data })
        } catch (err) {
            console.log(err ? err.response.data : err)
        }
    }
}