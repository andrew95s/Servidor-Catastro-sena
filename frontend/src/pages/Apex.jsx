import React, { useState, useEffect } from "react";
import api from "../api/api";
import DatosMaestros from "../components/Data";
import "../styles/Home.css";

function Apex() {
    const [datosMaestros, setDatosMaestros] = useState([]);
    const [formData, setFormData] = useState({
        territorial: "",
        id_negocio: "",
        numero_solicitud: "",
        municipio: "",
        zona: "",
        numero_radicacion: "",
        numero_predial: "",
        tipo_tramite: "",
        clasificacion: "",
        estado_tramite: "",
        estado_proceso: "",
        inicio_proceso: "",
        fin_proceso: "",
        tarea: "",
        estado_tarea: "",
        fecha_inicio_tarea: "",
        fecha_fin_tarea: "",
        dias_habiles: null,
        funcionario_radicador: "",
        usuario_propietario: "",
        numero_resolucion: "",
        fecha_resolucion: "",
        radicacion_masivo: "",
        folio_matricula: ""
    });

    useEffect(() => {
        getDatosMaestros();
    }, []);

    const getDatosMaestros = () => {
        api
            .get("/api/datos-maestros/")
            .then((res) => res.data)
            .then((data) => {
                setDatosMaestros(data);
            })
            .catch((err) => alert(err));
    };

    const deleteDatosMaestros = (numeroRadicacion) => {
        api
            .delete(`/api/datos-maestros/${numeroRadicacion}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Registro eliminado!");
                    getDatosMaestros();
                } else {
                    alert("Error al eliminar el registro.");
                }
            })
            .catch((error) => alert(error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const createDatosMaestros = (e) => {
        e.preventDefault();
        api
            .post("/api/datos-maestros/", formData)
            .then((res) => {
                if (res.status === 201) {
                    alert("Registro creado!");
                    setFormData({
                        territorial: "",
                        id_negocio: "",
                        numero_solicitud: "",
                        municipio: "",
                        zona: "",
                        numero_radicacion: "",
                        numero_predial: "",
                        tipo_tramite: "",
                        clasificacion: "",
                        estado_tramite: "",
                        estado_proceso: "",
                        inicio_proceso: "",
                        fin_proceso: "",
                        tarea: "",
                        estado_tarea: "",
                        fecha_inicio_tarea: "",
                        fecha_fin_tarea: "",
                        dias_habiles: null,
                        funcionario_radicador: "",
                        usuario_propietario: "",
                        numero_resolucion: "",
                        fecha_resolucion: "",
                        radicacion_masivo: "",
                        folio_matricula: ""
                    });
                    getDatosMaestros();
                } else {
                    alert("Error al crear el registro.");
                }
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="home-container">
            <div className="datos-maestros-section">
                <h2>Datos Maestros</h2>
                {datosMaestros.map((dm) => (
                    <DatosMaestros datosMaestros={dm} onDelete={deleteDatosMaestros} key={dm.numero_radicacion} />
                ))}
            </div>
            <div className="form-section">
                <h2>Crear Registro</h2>
                <form onSubmit={createDatosMaestros}>
                    {/* Aquí puedes agregar más campos del formulario según tus necesidades */}
                    <label htmlFor="territorial">Territorial:</label>
                    <input type="text" id="territorial" name="territorial" value={formData.territorial} onChange={handleInputChange} />
                    
                    {/* Otros campos del formulario */}

                    <input type="submit" value="Crear Registro" />
                </form>
            </div>
        </div>
    );
}

export default Apex;
