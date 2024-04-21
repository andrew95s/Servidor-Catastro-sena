import React, { useEffect } from "react";
import Swal from 'sweetalert2'; // Importa SweetAlert2

function NotFound() {
    useEffect(() => {
        // Muestra la alerta de página no encontrada al cargar el componente
        Swal.fire({
            title: '404 No Encontrado',
            text: '¡La página que estás buscando no existe!',
            icon: 'error',
            confirmButtonText: 'Entendido',
        }).then(() => {
            // Redirige a la página de inicio al hacer clic en "Entendido"
            window.location.href = '/';
        });
    }, []);

    return null; // Retorna null para que no se renderice ningún contenido adicional
}

export default NotFound;


