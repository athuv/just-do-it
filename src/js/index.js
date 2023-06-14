import '../css/style.css';
import favSrc from '../images/favicon.ico';

function component() {
  const title = document.querySelector('title');
  const linkElement = document.createElement('link');
  linkElement.rel = 'icon';
  linkElement.href = favSrc;
  document.head.insertBefore(linkElement, title.nextSibling);

  const main = document.querySelector('main');
  const div = document.createElement('div');
  div.classList.add('hello');
  div.textContent = 'HELLO';

  main.appendChild(div);

  return main;
}

document.body.appendChild(component());