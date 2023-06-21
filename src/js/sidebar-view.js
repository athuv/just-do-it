import * as elementManager from './utils-view';
import * as icons from './icons';


const iconMapping = {
  'Today': icons.todayIcon,
  'Coming Week': icons.comingWeekIcon,
  'dotIcon': icons.dotIcon,
  'addIcon': icons.addIcon,
  'toggleIcon': icons.toggleIcon,
  'editIcon': icons.editIcon,
  'deleteIcon': icons.deleteIcon,
};

function createPeriodButtons(name) {
  const liClass = `sidebar-period-buttons__${name.toLowerCase().replace(/\s/g,'-')}`;
  const liId = `button-${name.toLowerCase().replace(/\s/g,'-')}`;
  const li = elementManager.createLiElement(
    ['sidebar-period-buttons__button', liClass],
    {'id': liId}
    );

  const iconFunction = iconMapping[name];
  const span = elementManager.createSpanElement(
    ['sidebar-period-buttons__button__contents', liClass],
    {},
    {innerHTML:`${iconFunction()} <p>${name}</p>`}
  );
  elementManager.appendElements(li, span);
  return li;
}

function sidebarPeriodTasks() {
  const ul = elementManager.createUlElement(['sidebar-period-buttons']);
  const liNames = ['Today', 'Coming Week'];
  liNames.forEach((name) => {
    const li = createPeriodButtons(name);
    ul.appendChild(li);
  });
  return ul;
}

function createProjectButton(project) {
  const li = elementManager.createLiElement(['sidebar-project-buttons__button']);
  const iconDot = iconMapping.dotIcon;
  const span = elementManager.createSpanElement(
    ['sidebar-period-buttons__button__contents'],
    {},
    {innerHTML: `${iconDot()} <p>${project.name}</p>`}
  );
  const divButtonWrapper = elementManager.createDivElement(['button__edit-delete-buttons']); 
  elementManager.appendElements(span, divButtonWrapper);

  const iconEdit = iconMapping.editIcon;
  const buttonEdit = elementManager.createButtonElement(
    ['button__edit-delete-buttons__edit'],
    {'data-id': project.id},
    {innerHTML: iconEdit()}
  )

  const iconDelete = iconMapping.deleteIcon;
  const buttonDelete = elementManager.createButtonElement(
    ['button__edit-delete-buttons__delete'],
    {'data-id': project.id},
    {innerHTML: iconDelete() }
  );
  elementManager.appendElements(divButtonWrapper, buttonEdit, buttonDelete);
  elementManager.appendElements(li, span);
  return li;
}

function projectHeaderView() {
  const div = elementManager.createDivElement(['sidebar-project-heading']);
  const p = elementManager.createPElement(
    ['sidebar-project-heading__text'],
    {},
    {innerText: 'Projects'}
  );

  const divHeaderButtonWrapper = elementManager.createDivElement(['sidebar-project-heading__button-group']);
  const iconAdd = iconMapping.addIcon;
  const buttonHeaderAdd = elementManager.createButtonElement(
    ['sidebar-project-heading__button'],
    {},
    {innerHTML: iconAdd()}
    );

  const iconToggle = iconMapping.toggleIcon;
  const buttonToggle = elementManager.createButtonElement(
    ['sidebar-project-heading__button'],
    {},
    {innerHTML: iconToggle()}
  );

  elementManager.appendElements(div, p, divHeaderButtonWrapper);
  elementManager.appendElements(divHeaderButtonWrapper, buttonHeaderAdd, buttonToggle);
  return div;
}

function projectView(project) {
  const div = projectHeaderView();

  const ul = elementManager.createUlElement(['sidebar-project-buttons']);
  const projectData = project.getProject();

  projectData.forEach((project) =>{
    const li = createProjectButton(project);
    elementManager.appendElements(ul, li);
  }); 

  return {div, ul}
}

export default function sidebarView(project) { 
  
  const mainElement = document.querySelector('main');
  const asideElement = mainElement.querySelector(':first-child');
  const {div, ul} = projectView(project);
  elementManager.appendElements(asideElement, sidebarPeriodTasks(), div, ul);
}
