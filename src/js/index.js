import '../css/normalize.css';
import '../css/style.css';
import favSrc from '../images/favicon.ico';
import headerView from './header-view';

const Addfavivon = () =>{
  const title = document.querySelector('title');
  const linkElement = document.createElement('link');
  linkElement.rel = 'icon';
  linkElement.href = favSrc;
  document.head.insertBefore(linkElement, title.nextSibling);
}

function component() {
  Addfavivon();
  headerView();
  const bodyElement = document.body;


  return bodyElement;
}
 document.documentElement.appendChild(component());
