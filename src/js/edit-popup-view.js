import { task, project } from './utils';
import { format } from 'date-fns';
import * as elementManager from './utils-view';
import * as icons from './icons';

function editPopupView(taskId) {
  const taskInstance = task();
  const taskResult = taskInstance.getTaskById(parseInt(taskId));
  
  const div = elementManager.createDivElement(['task-content-popup'], {'id': 'task-edit-popup'});
  const divContent = elementManager.createDivElement(
    ['task-content-popup__content'],
    {},
    {innerText: taskResult.name}
  );
  const buttonClose = elementManager.createButtonElement(['task-content-popup__close-button'], {'id':'closebtn'}, {innerText: 'Close'});
  
  elementManager.appendElements(divContent, buttonClose);
  elementManager.appendElements(div, divContent);
  return div;
}

function editPopup() {
  const mainElement = document.querySelector('main');
  const asideElement = mainElement.querySelector('aside:nth-child(2)');
  const sectionElement = asideElement.querySelector('section:nth-child(1)');

  const todayContentEditButton = document.querySelectorAll('.content-edit-button__edit-button');

  
 
  
  if(todayContentEditButton !== null) {
    todayContentEditButton.forEach(editButton => {
      editButton.addEventListener('click', () => {
        const taskId = editButton.getAttribute('data-id');

        elementManager.appendElements(sectionElement, editPopupView(taskId));
        const popup = document.getElementById('task-edit-popup');      
        popup.style.display = 'flex';
  
        const clsBtn = document.getElementById('closebtn');
        clsBtn.addEventListener('click', () => {
          const popup = document.getElementById('task-edit-popup');
          popup.style.display = 'none';
        })
      });
    });

  }
}

export { editPopup }