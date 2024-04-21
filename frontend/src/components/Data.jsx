import React from "react";
import "../styles/DatosMaestros.css";

function DatosMaestros({ datosMaestros, onDelete }) {
    // Puedes ajustar el formateo de fecha según la representación de tus fechas
    const formattedStartDate = new Date(datosMaestros.fecha_inicio_tarea).toLocaleDateString("en-US");
    const formattedEndDate = new Date(datosMaestros.fecha_fin_tarea).toLocaleDateString("en-US");

    return (
        <div className="datos-maestros-container">
            <p className="datos-maestros-territorial">Territorial: {datosMaestros.territorial}</p>
            <p className="datos-maestros-id-negocio">ID Negocio: {datosMaestros.id_negocio}</p>
            <p className="datos-maestros-numero-solicitud">Número de Solicitud: {datosMaestros.numero_solicitud}</p>
            <p className="datos-maestros-municipio">Municipio: {datosMaestros.municipio}</p>
            <p className="datos-maestros-zona">Zona: {datosMaestros.zona}</p>
            <p className="datos-maestros-numero-radicacion">Número de Radicación: {datosMaestros.numero_radicacion}</p>
            <p className="datos-maestros-numero-predial">Número Predial: {datosMaestros.numero_predial}</p>
            <p className="datos-maestros-tipo-tramite">Tipo de Trámite: {datosMaestros.tipo_tramite}</p>
            <p className="datos-maestros-clasificacion">Clasificación: {datosMaestros.clasificacion}</p>
            <p className="datos-maestros-estado-tramite">Estado de Trámite: {datosMaestros.estado_tramite}</p>
            <p className="datos-maestros-estado-proceso">Estado de Proceso: {datosMaestros.estado_proceso}</p>
            <p className="datos-maestros-inicio-proceso">Inicio de Proceso: {datosMaestros.inicio_proceso}</p>
            <p className="datos-maestros-fin-proceso">Fin de Proceso: {datosMaestros.fin_proceso}</p>
            <p className="datos-maestros-tarea">Tarea: {datosMaestros.tarea}</p>
            <p className="datos-maestros-estado-tarea">Estado de Tarea: {datosMaestros.estado_tarea}</p>
            <p className="datos-maestros-fecha-inicio-tarea">Fecha de Inicio Tarea: {formattedStartDate}</p>
            <p className="datos-maestros-fecha-fin-tarea">Fecha de Fin Tarea: {formattedEndDate}</p>
            <p className="datos-maestros-dias-habiles">Días Hábiles: {datosMaestros.dias_habiles}</p>
            <p className="datos-maestros-funcionario-radicador">Funcionario Radicador: {datosMaestros.funcionario_radicador}</p>
            <p className="datos-maestros-usuario-propietario">Usuario Propietario: {datosMaestros.usuario_propietario}</p>
            <p className="datos-maestros-numero-resolucion">Número de Resolución: {datosMaestros.numero_resolucion}</p>
            <p className="datos-maestros-fecha-resolucion">Fecha de Resolución: {datosMaestros.fecha_resolucion}</p>
            <p className="datos-maestros-radicacion-masivo">Radicación Masiva: {datosMaestros.radicacion_masivo}</p>
            <p className="datos-maestros-folio-matricula">Folio de Matrícula: {datosMaestros.folio_matricula}</p>
            <button className="delete-button" onClick={() => onDelete(datosMaestros.numero_radicacion)}>
                Delete
            </button>
        </div>
    );
}

export default DatosMaestros;
