import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Feeling</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

/* Agregar fondo de pagina desde carpeta*/
/*document.body.style.backgroundImage = "url('./src/img/background.jpg')";
document.body.style.backgroundSize = "cover";
*/


setupCounter(document.querySelector('#counter'))
