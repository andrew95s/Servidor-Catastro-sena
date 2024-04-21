import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../api/constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
import Swal from 'sweetalert2';

import loginImage from "../public/img/login.png";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Ingresar" : "Registrarse";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            if (method === "register" && password !== confirmPassword) {
                throw new Error("Las contraseñas no coinciden");
            }

            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
                Swal.fire({
                    title: 'Conexión exitosa',
                    text: '¡LOGIN CORRECTO!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000 // Duración de 1 segundos
                });
            } else {
                // Registro exitoso
                Swal.fire({
                    title: 'Registro exitoso',
                    text: '¡Registro exitoso!',
                    icon: 'success',
                    showConfirmButton: true,
                    timer: 1000 
                });
                navigate("/login");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Error de autenticación
                Swal.fire({
                    title: 'Error de autenticación',
                    text: 'Credenciales incorrectas',
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 5000 // Duración de 2 segundos
                });
            } else {
                // Otros errores
                Swal.fire({
                    title: 'Error de conexión',
                    text: error.message || 'No se pudo completar el registro. Por favor, inténtalo de nuevo más tarde.',
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 5000 // Duración de 2 segundos
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancelRegistration = () => {
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center min-h-screen !important">
            <form onSubmit={handleSubmit} className="form-container">
                <h1>{name}</h1>
                <img src={loginImage} alt="Login" className="login-image" />
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {method === "register" && (
                    <input
                        className="form-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                    />
                )}
                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit">
                    {name}
                </button>
                {method === "login" ? (
                    <button
                        className="form-button-registro"
                        onClick={() => navigate("/register")}
                        type="button"
                    >
                        Registrarse
                    </button>
                ) : (
                    <button
                        className="form-button-cancel"
                        onClick={handleCancelRegistration}
                        type="button"
                    >
                        Cancelar
                    </button>
                )}
            </form>
        </div>
    );
}

export default Form;