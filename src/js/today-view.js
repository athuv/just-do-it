
import { task, project } from './utils';
import { format } from 'date-fns';
import * as elementManager from './utils-view';
import * as icons from './icons';
import { editPopup } from './edit-popup-view';

const iconMapping = {
  'dragIcon': icons.dragIcon,
  'editIcon': icons.editIcon,
  'checkIcon': icons.checkIcon,
};

function renderSection() {
  return elementManager.createSectionElement(['today-content']);
}

function renderTodayView() {
  
  const divHeader = elementManager.createDivElement(['today-content__header-wrapper']);
  const date = new Date();
  const formattedDate = format(date, 'EEE dd MMM');
  const h3 = elementManager.createH3Element(
    ['today-content__header-topic'],
    {},
    {innerText: 'Today'}
  );

  const spanDate = elementManager.createSpanElement(
    ['today-content__header-date'],
    {},
    {innerText: formattedDate}
    );

  elementManager.appendElements(divHeader, h3, spanDate);
  return divHeader;
}

function renderTodayTaskContent(task) {
  const projectInstance = project();
  const projectName = projectInstance.getProjectbyId(task.projectId).name;
  const iconDrag = iconMapping.dragIcon;
  const iconCheck = iconMapping.checkIcon;

  const divParent = elementManager.createDivElement(['today-content__tasks-item__content']);

  
  const divDragButton = elementManager.createDivElement(
    ['today-content__tasks-item__content-drag-button'],
    {},
    {innerHTML: iconDrag()}
  );
  const divRadioButton = elementManager.createDivElement(
    ['today-content__tasks-item__content-check-button-wrapper']
  );
  const spanCheckButton = elementManager.createSpanElement(
    ['today-content__tasks-item__content-check-button'],
    {},
    {innerHTML: iconCheck()}
    );
  elementManager.appendElements(divRadioButton, spanCheckButton);

  const divName = elementManager.createDivElement(
    ['today-content__tasks-item__content-name'],
    {},
    {innerText: task.name}
  );
  const divEditButton = elementManager.createDivElement(['today-content__tasks-item__content-edit-button']);

  const iconEdit = iconMapping.editIcon;
  const buttonEdit = elementManager.createButtonElement(['content-edit-button__edit-button'],
    {
      'id': 'task-content-edit-button',
      'data-id': task.id,
    },
    {innerHTML:iconEdit()}
  );
  elementManager.appendElements(divEditButton, buttonEdit);

  const divDescription = elementManager.createDivElement(
    ['today-content__tasks-item__content-description'],
    {},
    {innerText: task.description}
    );

  const divProjectTitle = elementManager.createDivElement(
    ['today-content__tasks-item__content-project-title'],
    {},
    {innerText: projectName}
  );

  elementManager.appendElements(
    divParent,
    divDragButton,
    divRadioButton,
    divName,
    divEditButton,
    divDescription,
    divProjectTitle,
  );

  return divParent;
}

function renderTodayTasks() {
  const taskInstance = task();
  const todayTasks = taskInstance.todayTasks();
  
  const divTodayTasks = elementManager.createDivElement(['today-content__tasks-wrapper']);
  const ul = elementManager.createUlElement(['today-content__tasks-list']);
  todayTasks.forEach((task) => {
    const li = elementManager.createLiElement(
      ['today-content__tasks-item']
      );
    elementManager.appendElements(li, renderTodayTaskContent(task));
    elementManager.appendElements(ul, li);
  });
  elementManager.appendElements(divTodayTasks, ul);
  return divTodayTasks;
}

export default function todayView() {
  const mainElement = document.querySelector('main');
  const asideElement = mainElement.querySelector('aside:nth-child(2)');
  
  const asideChildSection = renderSection();
  elementManager.appendElements(asideElement, asideChildSection);

  const todayButton = document.getElementById('button-today');
  todayButton.addEventListener('click', () => {
    asideChildSection.textContent = '';
    elementManager.appendElements(asideChildSection, renderTodayView(), renderTodayTasks());
    editPopup();
  });


  // console.log(todayButton);
  // const t = task();
  // console.log(t.todayTasks());
}