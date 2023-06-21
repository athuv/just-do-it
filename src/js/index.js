import '../css/normalize.css';
import '../css/style.css';
import Project from './project';
import favSrc from '../images/favicon.ico';
import headerView from './header-view';
import sidebarView from './sidebar-view';
import todayView from './today-view';
import { task } from './utils';

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
  todayView();

  const tasks = task();
  window.a = project;
  window.b = tasks;
  return bodyElement;
}
 document.documentElement.appendChild(component());

