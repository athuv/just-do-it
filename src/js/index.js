import '../css/normalize.css';
import '../css/style.css';
import favSrc from '../images/favicon.ico';
import headerView from './header-view';
import sidebarView from './sidebar-view';
import { task, project } from './utils';

const Addfavivon = () =>{
  const title = document.querySelector('title');
  const linkElement = document.createElement('link');
  linkElement.rel = 'icon';
  linkElement.href = favSrc;
  document.head.insertBefore(linkElement, title.nextSibling);
}

function component() {
  const bodyElement = document.body;
  const projectInstance = project();
  Addfavivon();
  headerView();
  sidebarView(projectInstance);

  const tasks = task();
  window.a = projectInstance;
  window.b = tasks;
  return bodyElement;
}
 document.documentElement.appendChild(component());

