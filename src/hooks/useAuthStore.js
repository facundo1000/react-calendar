/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogOut } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    //methods
    //function to login
    const startLogin = async ({ email, password }) => {

        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth', { email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ uid: data.uid, name: data.name }));

        } catch (error) {
            dispatch(onLogOut('Credentials are invalid'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    };

    //function to register
    const startRegister = async ({ email, password, name }) => {

        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/new', { email, password, name });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ uid: data.uid, name: data.name }));

        } catch (error) {
            dispatch(onLogOut(error.response.data?.msg || 'Error creating user'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    };

    //function to check the token
    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) dispatch(onLogOut('There is no token'));

        try {

            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ uid: data.uid, name: data.name }));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogOut('Invalid token'));
        }
    };

    //function to logout
    const startLogOut = () => {
        localStorage.clear();
        dispatch(onLogOut());
    }

    return {
        //properties
        status,
        user,
        errorMessage,

        //methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogOut,
    };
};
