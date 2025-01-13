// URL del archivo XML en GitHub
const url = 'https://raw.githubusercontent.com/usuario/repositorio/main/data.xml';

// Función para cargar y procesar el menú
async function loadMenu() {
  try {
    const response = await fetch(url);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "application/xml");

    const menuContainer = document.getElementById('menu');

    // Iterar sobre cada grupo en el XML
    const grupos = xml.getElementsByTagName('GRUPO');
    for (let grupo of grupos) {
      const grupoDiv = document.createElement('div');
      grupoDiv.classList.add('GRUPO');

      // Añadir el nombre del grupo como encabezado
      const grupoNombre = grupo.getElementsByTagName('NOMBRE')[0].textContent;
      const grupoTitle = document.createElement('h2');
      grupoTitle.textContent = grupoNombre;
      grupoDiv.appendChild(grupoTitle);

      // Iterar sobre los platos dentro del grupo
      const platos = grupo.getElementsByTagName('PLATO');
      for (let plato of platos) {
        const platoDiv = document.createElement('div');
        platoDiv.classList.add('PLAT');

        const platoNombre = plato.getElementsByTagName('NOMBRE')[0].textContent;
        const platoDescripcion = plato.getElementsByTagName('DESCRIPCIO')[0].textContent;
        const platoPrecio = plato.getElementsByTagName('PRECIO')[0].textContent;

        // Crear los elementos para nombre, descripción y precio
        const nombreElem = document.createElement('div');
        nombreElem.classList.add('NOM');
        nombreElem.textContent = platoNombre;

        const descElem = document.createElement('div');
        descElem.classList.add('DESCRIPCI');
        descElem.textContent = platoDescripcion;

        const precioElem = document.createElement('div');
        precioElem.classList.add('PRECIO');
        precioElem.textContent = `${platoPrecio} €`;

        // Añadir elementos al plato
        platoDiv.appendChild(nombreElem);
        platoDiv.appendChild(descElem);
        platoDiv.appendChild(precioElem);

        // Añadir plato al grupo
        grupoDiv.appendChild(platoDiv);
      }

      // Añadir el grupo al contenedor principal
      menuContainer.appendChild(grupoDiv);
    }
  } catch (error) {
    console.error('Error al cargar el menú:', error);
  }
}

// Ejecutar la carga del menú al cargar la página
document.addEventListener('DOMContentLoaded', loadMenu);