
import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './login.css';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
};

const registerFormFields = {
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
    registerName: '',
};

export const LoginPage = () => {

    const { startLogin, startRegister, errorMessage } = useAuthStore();

    // useForm - Login
    const { loginEmail,
        loginPassword,
        onInputChange: onLoginInputChange, onResetForm } = useForm(loginFormFields);

    // useForm - Register
    const { registerEmail,
        registerPassword,
        registerPassword2,
        registerName,
        onInputChange: onRegisterInputChange } = useForm(registerFormFields);

    // Login Submit
    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
        onResetForm();
    }

    // Register Submit
    const registerSubmit = (e) => {
        e.preventDefault();
        if (registerPassword !== registerPassword2) {
            Swal.fire('Error en la Autenticacion', 'Las contraseñas deben de ser iguales', 'error');
            return;
        }
        startRegister({ email: registerEmail, password: registerPassword, name: registerName });
        onResetForm();
    };

    // useEffect - errorMessage
    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la Autenticacion', errorMessage, 'error');
        }
    }, [errorMessage]);

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                {/*Register Form  */}
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}