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

// Lee mensaje de query strings
const urlSearchParams = new URLSearchParams(window.location.search)
const messageCustom = urlSearchParams.get('message')

if (messageCustom) {
  const mainMessageElement = document.querySelector('#mainMessage')
  mainMessageElement.textContent = formatMessage(decodeURI(messageCustom))
}

// Funcionalidad de botones
const btnOpenElement = document.querySelector('#open')
const btnCloseElement = document.querySelector('#close')

btnCloseElement.disabled = true

btnOpenElement.addEventListener('click', ()=> {
  btnOpenElement.disabled = true
  btnCloseElement.disabled = false
  const coverElement = document.querySelector('.cover')
  coverElement.classList.add('open-cover')

  setTimeout(()=>{
    coverElement.style.zIndex = -1
    
    const paperElement = document.querySelector('.paper')
    paperElement.classList.remove('close-paper')
    paperElement.classList.add('open-paper')

    const heartElement = document.querySelector('.heart')
    heartElement.style.display = 'block'
  
  }, 500)
})

btnCloseElement.addEventListener('click', ()=> {
  btnOpenElement.disabled = false
  btnCloseElement.disabled = true

  const coverElement = document.querySelector('.cover')
  const paperElement = document.querySelector('.paper')
  paperElement.classList.remove('open-paper')
  paperElement.classList.add('close-paper')
  
  setTimeout(()=>{
    coverElement.style.zIndex = 0
    coverElement.classList.remove('open-cover')

    const heartElement = document.querySelector('.heart')
    heartElement.style.display = 'none'
  },500)
})