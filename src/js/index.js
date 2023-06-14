import '../css/style.css';
import favSrc from '../images/favicon.ico';
import project from './project';

const Addfavivon = () =>{
  const title = document.querySelector('title');
  const linkElement = document.createElement('link');
  linkElement.rel = 'icon';
  linkElement.href = favSrc;
  document.head.insertBefore(linkElement, title.nextSibling);
}

function component() {
  Addfavivon();
  const main = document.querySelector('main');
  
  return main;
}

document.body.appendChild(component());