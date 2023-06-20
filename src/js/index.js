import '../css/normalize.css';
import '../css/style.css';
import Project from './project';
import favSrc from '../images/favicon.ico';
import headerView from './header-view';
import sidebarView from './sidebar-view';

const Addfavivon = () =>{
  const title = document.querySelector('title');
  const linkElement = document.createElement('link');
  linkElement.rel = 'icon';
  linkElement.href = favSrc;
  document.head.insertBefore(linkElement, title.nextSibling);
}

function component() {
  const bodyElement = document.body;
  const project = new Project();
  Addfavivon();
  headerView();
  sidebarView(project);

  return bodyElement;
}
 document.documentElement.appendChild(component());
