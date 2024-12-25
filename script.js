// Función para formatear el mensaje
const formatMessage = (message) => {
  const words = message.split(' ');
  let lines = [];
  let currentLine = '';
  
  words.forEach(word => {
    if (currentLine.length + word.length > 30) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += (currentLine.length === 0 ? '' : ' ') + word;
    }
  });
  lines.push(currentLine);
  
  return lines.join('\n');
};

// Leer mensaje desde los query strings
const urlSearchParams = new URLSearchParams(window.location.search);
const messageCustom = urlSearchParams.get('message');

if (messageCustom) {
  const mainMessageElement = document.querySelector('#mainMessage');
  mainMessageElement.textContent = formatMessage(decodeURI(messageCustom));
}

// Selección de elementos
const btnOpenElement = document.querySelector('#open');
const btnCloseElement = document.querySelector('#close');
const coverElement = document.querySelector('.cover');
const paperElement = document.querySelector('.paper');
const heartElement = document.querySelector('.heart');
const titleElement = document.querySelector('.title'); // Selección del título

btnCloseElement.disabled = true; // Desactivar botón "Cerrar" al inicio

// Evento para el botón "Abrir"
btnOpenElement.addEventListener('click', () => {
  btnOpenElement.disabled = true; // Desactivar botón "Abrir"
  btnCloseElement.disabled = false; // Activar botón "Cerrar"
  titleElement.style.display = "none"; // Ocultar el título

  coverElement.classList.add('open-cover');

  setTimeout(() => {
    coverElement.style.zIndex = -1;
    paperElement.classList.remove('close-paper');
    paperElement.classList.add('open-paper');
    heartElement.style.display = 'block';
  }, 500);
});

// Evento para el botón "Cerrar"
btnCloseElement.addEventListener('click', () => {
  btnOpenElement.disabled = false; // Activar botón "Abrir"
  btnCloseElement.disabled = true; // Desactivar botón "Cerrar"
  titleElement.style.display = "block"; // Mostrar el título

  paperElement.classList.remove('open-paper');
  paperElement.classList.add('close-paper');

  setTimeout(() => {
    coverElement.style.zIndex = 0;
    coverElement.classList.remove('open-cover');
    heartElement.style.display = 'none';
  }, 500);
});
