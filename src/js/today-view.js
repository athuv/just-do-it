
import { task, project } from './utils';
import { format } from 'date-fns';
import * as elementManager from './utils-view';
import * as icons from './icons';
import { editPopup } from './edit-popup-view';

const iconMapping = {
  'dragIcon': icons.dragIcon,
  'editIcon': icons.editIcon,
  'checkIcon': icons.checkIcon,
  'deleteIcon': icons.deleteIcon,
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
  const iconEdit = iconMapping.editIcon;
  const iconDelete = iconMapping.deleteIcon;

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
    {'data-id': task.id},
    {innerHTML: iconCheck()}
    );
  elementManager.appendElements(divRadioButton, spanCheckButton);

  const divName = elementManager.createDivElement(
    ['today-content__tasks-item__content-name'],
    {},
    {innerText: task.name}
  );
  const divEditButton = elementManager.createDivElement(['today-content__tasks-item__content-button-wrapper']);

  
  const buttonEdit = elementManager.createButtonElement(['content-edit-button__edit-button'],
    {
      'id': 'task-content-edit-button',
      'data-id': task.id,
    },
    {innerHTML:iconEdit()}
  );

  const divDeleteButton = elementManager.createButtonElement(
    ['content-delete-button__delete-button'],
    {
      'id': 'task-content-edit-button',
      'data-id': task.id,
    },
    {innerHTML:iconDelete()}
    );

  elementManager.appendElements(divEditButton, buttonEdit, divDeleteButton);

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

function renderEditPopupWrapper() {
  return elementManager.createDivElement(['task-content-popup'], {'id': 'task-edit-popup'});
}

function buttonCheckClick(){
  const buttonCheck = document.querySelectorAll('.today-content__tasks-item__content-check-button');
  const taskInstance = task();
  const buttonCheckHandler = (event) => {
    const taskId = event.target.getAttribute('data-id');
    //taskInstance.deleteTask(taskId);
    event.target.classList.add('today-content__tasks-item__content-check-button--clicked');
    const svgElement = event.target.querySelector(':first-child');
    svgElement.style.opacity = 1;
    const parentLi = event.target.closest('li');
    
    setTimeout(()=>{
      parentLi.remove();
    }, 1000)
  }

  buttonCheck.forEach((button) => {
    button.addEventListener('click', buttonCheckHandler);    
  });
}

function todayEditButtonClick() {
  const todayContentEditButton = document.querySelectorAll('.content-edit-button__edit-button');
    todayContentEditButton.forEach(editButton => {
      editButton.addEventListener('click', () => {
        const taskId = editButton.getAttribute('data-id');
        editPopup(taskId);
        const popup = document.getElementById('task-edit-popup');      
        popup.style.display = 'flex';
      });
    });
}

function todayDeleteButtonClick() {
  const buttonDelete = document.querySelectorAll('.content-delete-button__delete-button');
  const taskInstance = task();
  const buttonDeleteHandler = (event) => {
    const taskId = event.currentTarget.getAttribute('data-id');
    const parentLi = event.target.closest('li');
    parentLi.classList.add('today-content__tasks-item--clicked');
    //taskInstance.deleteTask(taskId);

    setTimeout(()=>{
      parentLi.remove();
    }, 1000)
  }

  buttonDelete.forEach((button) => {
    button.addEventListener('click', buttonDeleteHandler);    
  });
}

function todayView() {
  const mainElement = document.querySelector('main');
  const asideElement = mainElement.querySelector('aside:nth-child(2)');
  
  asideElement.textContent = '';
  const asideChildSection = renderSection();  
  elementManager.appendElements(asideElement, asideChildSection);

  asideChildSection.textContent = '';
  elementManager.appendElements(
    asideChildSection,
    renderTodayView(),
    renderTodayTasks(),
    renderEditPopupWrapper()
  );
  buttonCheckClick();
  todayEditButtonClick(); 
  todayDeleteButtonClick();
}

export {
  todayView,
}