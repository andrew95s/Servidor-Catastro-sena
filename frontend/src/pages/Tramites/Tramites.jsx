
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from "../../api/constants";
import TramitesTable from '../../components/Tramites/TramitesTable';
import TramitesCard from '../../components/Tramites/TramitesCard';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Sidebar from '../../layout/Sidebar/Sidebar';
import { API_URL } from '../../api/api_data'
import '../../output.css';

const Tramites = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [cantidadResultados, setCantidadResultados] = useState(100); // Valor por defecto
  const [filtroMunicipio, setFiltroMunicipio] = useState('');
  const [filtroZona, setFiltroZona] = useState('');
  const [filtroTipoTramite, setFiltroTipoTramite] = useState('');
  const [filtroNumeroPredial, setFiltroNumeroPredial] = useState('');
  const [filtroTarea, setFiltroTarea] = useState('');
  const [filtroEstadoTramite, setEstadoTramite] = useState('');
  const [filtroEstadoProceso, setEstadoProceso] = useState('');
  const [filtroEstadoTarea, setEstadoTarea] = useState('');
  const [filtroNumeroRadicacion, setFiltroNumeroRadicacion] = useState(''); // Nuevo estado para el número de radicación

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      // Construir la URL de la consulta
      let url = `${API_URL}/datos-maestros/?cantidad=${cantidadResultados}&municipio=${filtroMunicipio}&municipio=${filtroZona}&tipo_tramite=${filtroTipoTramite}&tarea=${filtroTarea}`;
      // Agregar el filtro de número de radicación si se proporciona
      if (filtroNumeroRadicacion) {
        url += `&numero_radicacion=${filtroNumeroRadicacion}`;
      }

      if (filtroNumeroPredial){
        url += `&numero_predial=${filtroNumeroPredial}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Filtrar por días hábiles mayores a 0 y ordenar de mayor a menor
      const notificacionesFiltradas = response.data
        .filter(notif => calcularDiasHabiles(notif.fecha_inicio_tarea, new Date().toISOString().split('T')[0]) > 0)
        .sort((a, b) => {
          const diasA = calcularDiasHabiles(a.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);
          const diasB = calcularDiasHabiles(b.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);
          return diasB - diasA; // Ordenar de mayor a menor
        });

      setNotificaciones(notificacionesFiltradas);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para calcular días hábiles
  function calcularDiasHabiles(fechaInicioStr, fechaFinStr) {
    if (!fechaInicioStr || !fechaFinStr) {
      return 0;
    }

    const fechaInicio = new Date(fechaInicioStr);
    const fechaFin = new Date(fechaFinStr);
    let diasHabiles = 0;
    let fechaActual = new Date(fechaInicio);

    while (fechaActual <= fechaFin) {
      const diaSemana = fechaActual.getDay();
      if (diaSemana !== 0 && diaSemana !== 6) { // 0: Domingo, 6: Sábado
        diasHabiles++;
      }
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return diasHabiles;
  }
  return (
    <>
    <div className='app'>
        <Sidebar />
      <div className='p-2'>
        <div className='flex justify-center items-center gap-x-4'>
          <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('table')}
          >
            Ver en Tablas
          </button>

          <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('card')}
          >
            Ver en Tarjetas
          </button>
        </div>
        <div className="p-2">
          <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-4">
            <div>
            <div className='flex justify-center items-center gap-x-2'>
        
              <label >Listar Cantidad:</label>
              <select
                className="border border-gray-300 rounded-md px-2 py-1"
                value={cantidadResultados}
                onChange={(e) => setCantidadResultados(Number(e.target.value))}
              >
                
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                  <option value={500}>500</option>
                  <option value={1000}>1000</option>
                  <option value={5000}>5000</option>
                  <option value={10000}>10000</option>
                  <option value={50000}>50000</option>
                  <option value={100000}>100000</option>
                  <option value={1000000}>1000000</option>
                  <option value={50000000}>50000000</option>
                </select>
            
            
              <div>
                <label>Municipio:</label>
                <select
                  className="border border-gray-300 rounded-md px-2 py-1"
                  value={filtroMunicipio}
                  onChange={(e) => setFiltroMunicipio(e.target.value)}
                >
                  <option value="">Seleccionar municipio</option>
                  <option value="AGUADAS">AGUADAS</option>
                  <option value="ANSERMA">ANSERMA</option>
                  <option value="ARANZAZU">ARANZAZU</option>
                  <option value="BELALCÁZAR">BELALCÁZAR</option>
                  <option value="CHINCHINÁ">CHINCHINÁ</option>
                  <option value="FILADELFIA">FILADELFIA</option>
                  <option value="LA DORADA">LA DORADA</option>
                  <option value="LA MERCED">LA MERCED</option>
                  <option value="MANZANARES">MANZANARES</option>
                  <option value="MARMATO">MARMATO</option>
                  <option value="MARQUETALIA">MARQUETALIA</option>
                  <option value="MARULANDA">MARULANDA</option>
                  <option value="NEIRA">NEIRA</option>
                  <option value="NORCASIA">NORCASIA</option>
                  <option value="PALESTINA">PALESTINA</option>
                  <option value="PENSILVANIA">PENSILVANIA</option>
                  <option value="PÁCORA">PÁCORA</option>
                  <option value="RIOSUCIO">RIOSUCIO</option>
                  <option value="RISARALDA">RISARALDA</option>
                  <option value="SALAMINA">SALAMINA</option>
                  <option value="SAMANÁ">SAMANÁ</option>
                  <option value="SAN JOSÉ">SAN JOSÉ</option>
                  <option value="SUPÍA">SUPÍA</option>
                  <option value="VICTORIA">VICTORIA</option>
                  <option value="VILLAMARÍA">VILLAMARÍA</option>
                  <option value="VITERBO">VITERBO</option>
                </select>
              </div>
              
              <div>
                <label>Zona: </label>
                <select
                  className="border border-gray-300 rounded-md px-2 py-1"
                  value={filtroZona}
                  onChange={(e) => setFiltroZona(e.target.value)}
                >
                  <option value="">Seleccionar municipio</option>
                  <option value="URBANO">URBANO</option>
                  <option value="RURAL">RURAL</option>
                </select>
              </div>
              <div>
                <label>Tipo de Trámite:</label>
                <select
                  className="border border-gray-300 rounded-md px-2 py-1"
                  value={filtroTipoTramite}
                  onChange={(e) => setFiltroTipoTramite(e.target.value)}
                >
                  <option value="">Seleccionar tipo de trámite</option>
                  <option value="Mutación Segunda Desenglobe">Mutación Segunda Desenglobe</option>
                  <option value="Mutación Primera">Mutación Primera</option>
                  <option value="Cancelación de Predio">Cancelación de Predio</option>
                  <option value="Rectificación">Rectificación</option>
                  <option value="Mutación Segunda Englobe">Mutación Segunda Englobe</option>
                  <option value="Mutación Quinta Nuevo">Mutación Quinta Nuevo</option>
                  <option value="Mutación Tercera">Mutación Tercera</option>
                  <option value="Complementación">Complementación</option>
                  <option value="Mutación Quinta Omitido">Mutación Quinta Omitido</option>
                  <option value="Revisión de Avalúo">Revisión de Avalúo</option>
                  <option value="Recurso Reposición en Subsidio Apelación">Recurso Reposición en Subsidio Apelación</option>
                  <option value="Mutación Segunda Coeficiente_Copropiedad">Mutación Segunda Coeficiente_Copropiedad</option>
                  <option value="Recurso de Reposición">Recurso de Reposición</option>
                  <option value="Recurso de Apelación">Recurso de Apelación</option>
                  <option value="Modificación Inscripción Catastral">Modificación Inscripción Catastral</option>
                </select>
              </div>
            </div>
            <div className='flex flex-col md:w-1 space-y-1'>
              <div className='p-2'>
              
                <div>
                  <label>Tarea:</label>
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1"
                    value={filtroTarea}
                    onChange={(e) => setFiltroTarea(e.target.value)}
                  >
                    <option value="">Seleccionar tarea</option>
                    <option value="Validación.Generar resolución">Validación.Generar resolución</option>
                    <option value="Validación.Aplicar cambios">Validación.Aplicar cambios</option>
                    <option value="Asignación.Determinar procedencia del trámite">Asignación.Determinar procedencia del trámite</option>
                    <option value="Asignación.Asignar trámites">Asignación.Asignar trámites</option>
                    <option value="Digitalización.Escanear">Digitalización.Escanear</option>
                    <option value="Asignación.Revisar trámite devuelto">Asignación.Revisar trámite devuelto</option>
                    <option value="Asignación.Revisar trámite asignado">Asignación.Revisar trámite asignado</option>
                    <option value="Validación.Revisar proyección">Validación.Revisar proyección</option>
                    <option value="Validación.Revisar proyección de resolución">Validación.Revisar proyección de resolución</option>
                    <option value="Ejecución.Modificar información alfanumérica">Ejecución.Modificar información alfanumérica</option>
                    <option value="Validación.Comunicar notificación de resolución">Validación.Comunicar notificación de resolución</option>
                    <option value="Ejecución.Modificar información geográfica">Ejecución.Modificar información geográfica</option>
                    <option value="Validación.Modificar información alfanumérica">Validación.Modificar información alfanumérica</option>
                    <option value="Validación.Revisar proyección del abogado">Validación.Revisar proyección del abogado</option>
                    <option value="Depuración.Solicitar ajuste espacial por digitalización">Depuración.Solicitar ajuste espacial por digitalización</option>
                    <option value="Asignación.Solicitar documento requerido faltante">Asignación.Solicitar documento requerido faltante</option>
                    <option value="Validación.Registrar aviso">Validación.Registrar aviso</option>
                    <option value="Validación.Radicar recurso">Validación.Radicar recurso</option>
                    <option value="Ejecución.Alistar información">Ejecución.Alistar información</option>
                    <option value="Validación.Revisar proyección del director">Validación.Revisar proyección del director</option>
                    <option value="Validación.Modificar información geográfica">Validación.Modificar información geográfica</option>
                    <option value="Radicación.Revisar solicitudes">Radicación.Revisar solicitudes</option>
                    <option value="Ejecución.Elaborar informe sustentando el concepto">Ejecución.Elaborar informe sustentando el concepto</option>
                    <option value="Ejecución.Cargar al SNC">Ejecución.Cargar al SNC</option>
                    <option value="Depuración.Asignar digitalizador">Depuración.Asignar digitalizador</option>
                    <option value="Depuración.Ajustar información espacial por digitalización">Depuración.Ajustar información espacial por digitalización</option>
                    <option value="Depuración.Revisar tareas a realizar">Depuración.Revisar tareas a realizar</option>
                    <option value="Validación.Registrar notificación">Validación.Registrar notificación</option>
                    <option value="Validación.Registrar notificación">Validación.Registrar notificación</option>
                    <option value="Asignación.Completar documentación solicitada">Asignación.Completar documentación solicitada</option>
                    <option value="Digitalización.Controlar la calidad del escaneo">Digitalización.Controlar la calidad del escaneo</option>
                    <option value="Validación.Notificar por aviso">Validación.Notificar por aviso</option>
                </select>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='p-1'>
                  <div>
                    <div className='p-1'>
                      <label>Estado Trámite:</label>
                      <select value={filtroEstadoTramite} onChange={(e) => setEstadoTramite(e.target.value)}>
                        <option value="">Seleccionar Estado Trámite:</option>
                        <option value="FINALIZADO_APROBADO">Finalizado Aprobado</option>
                        <option value="EN PROCESO">En Proceso</option>
                        <option value="CANCELADO">Cancelado</option>
                        <option value="EN ESPERA DE COMPLETAR DOC">En Espera de Completar Documentacion</option>
                        <option value="ARCHIVADO">Archivado</option>
                      </select>
                    </div>
                  </div>
            
                  <div>
                    <div className='p-1'>
                      <label>Estado Proceso:</label>
                      <select value={filtroEstadoProceso} onChange={(e) => setEstadoProceso(e.target.value)}>
                        <option value="">Seleccionar Estado Proceso:</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Ejecucion">Ejecución</option>
                        <option value="Terminado">Terminado</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label>Estado Tarea:</label>
                    <select value={filtroEstadoTarea} onChange={(e) => setEstadoTarea(e.target.value)}>
                      <option value="">Seleccionar Estado Tarea:</option>
                      <option value="Finalizada">Finalizada</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Terminada">Terminada</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='p-2'>
                <div>
                  <label>Número de Radicación:</label>
                  <input
              type="text"
              value={filtroNumeroRadicacion}
              onChange={(e) => setFiltroNumeroRadicacion(e.target.value)}
              className="border-2 border-blue-800 rounded-md px-2 py-3"
            />
                </div>
              </div>
            </div>
            <div className='p-2'>
            
              <label>Número Ficha Predial :</label>
              <input
              type="text"
              value={filtroNumeroPredial}
              onChange={(e) => setFiltroNumeroPredial(e.target.value)}
              className="border-2 border-blue-800 rounded-md px-2 py-3"
            />
            
          
            </div>
            <div className='flex justify-end items-end'> 
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={fetchData}>Buscar</button> 
            <Link to='/tramites/create'> 
            <MdOutlineAddBox className='text-sky-800 text-4xl' /> </Link> 
            </div> 
            </div> 
          </div> 
          {loading ? ( <Spinner /> ) : showType === 'table' ? ( <TramitesTable notificaciones={notificaciones} /> ) : ( <TramitesCard notificaciones={notificaciones} /> )} 
        </div> 
      </div>
    </div>
    </> 
    ); };


export default Tramites;
      