import { task, project } from './utils';
import { format } from 'date-fns';
import * as elementManager from './utils-view';
import * as icons from './icons';
import { todayView } from './today-view';

function renderPriorityOption(selectedPriority) {
  const priorities = ['Low', 'Medium', 'High'];
  const options = [];
  priorities.forEach((priority) => {
    let option;
    if(priority === selectedPriority) {
      option = elementManager.createOptionElement(
        ['task-content-popup__selectt-task-priority'],
        {
          'value': priority,
          'selected': true,
        },
        {innerText: priority }
      );
    }else {
      option = elementManager.createOptionElement(
        ['task-content-popup__selectt-task-priority'],
        {
          'value': priority,
        },
        {innerText: priority }
      );
    }


    options.push(option);
  });
  return options;
}

function renderProjectOption(projectId) {
  const projectInstance = project();
  const allProjects = projectInstance.getProject();
  const selectedOption = projectInstance.getProjectbyId(projectId);
  const options = [];
  allProjects.forEach((project) => {
    let option;
    if(project.id === projectId) {
      option = elementManager.createOptionElement(
        ['task-content-popup__option-project-name'],
        {
          'value': project.id,
          'selected': true,
        },
        {innerText: project.name}
      );
    }else{
      option = elementManager.createOptionElement(
        ['task-content-popup__option-project-name'],
        {'value': project.id},
        {innerText: project.name}
      );
    }
    options.push(option);
  });

  return options;
}

function closeButtonClick() {
  const editPopupCloseButton = document.getElementById('task-content-popup__close_button-id');
  const closeButtonHandle = () => {
    const popup = document.getElementById('task-edit-popup');
    popup.style.display = 'none';
    editPopupCloseButton.removeEventListener('click', closeButtonHandle);
  }
  editPopupCloseButton.addEventListener('click', closeButtonHandle);
}

function saveButtonClick(taskId) {
  const taskInstance = task();
  const saveButton = document.getElementById('task-content-popup__save_button-id');
  saveButton.addEventListener('click', () => {
    const taskName = document.getElementById('task-content-popup__input-task-name-id').value;
    const projectId = document.getElementById('task-content-popup__select-project-name-id').value;
    const description = document.getElementById('task-content-popup__textarea-task-description-id').value;
    const date = document.getElementById('task-content-popup__input-task-date-id').value;
    const priority = document.getElementById('task-content-popup__select-task-priority-id').value;

    const a = taskInstance.updateTask(
      parseInt(taskId),
      taskName,
      parseInt(projectId),
      description,
      date,
      priority
    );

    const popup = document.getElementById('task-edit-popup');
    todayView();
    popup.style.display = 'none';    
  });
}

function editPopupView(taskId) {
  const taskInstance = task();
  const taskResult = taskInstance.getTaskById(parseInt(taskId));
  const divTaskPopupWrapper = document.getElementById('task-edit-popup');
  divTaskPopupWrapper.textContent = '';

  const divContent = elementManager.createDivElement(
    ['task-content-popup__content'],
  );

  const inputTaskName = elementManager.createInputElement(
    ['task-content-popup__input-task-name'],
    {
      'type': 'text',
      'value': taskResult.name,
      'id': 'task-content-popup__input-task-name-id',
    },
  );

  const selectProject = elementManager.createSelectElement(
    ['task-content-popup__select-project-name'],
    {'id': 'task-content-popup__select-project-name-id'}
  );

  const optionProject = renderProjectOption(taskResult.projectId);
  elementManager.appendElements(selectProject, ...optionProject);

  const textareaDescription = elementManager.createTextareaElement(
    ['task-content-popup__textarea-task-description'],
    {
      'rows': 4,
      'cols': 70,
      'id': 'task-content-popup__textarea-task-description-id',
    },
    {innerText: taskResult.description}
  );
  
  const today = new Date();
  const formattedDate = format(today, 'yyyy-MM-dd');
  const inputDate = elementManager.createInputElement(
    ['task-content-popup__input-task-date'],
    {
      'type': 'date',
      'value': formattedDate,
      'id': 'task-content-popup__input-task-date-id',
    },
    {}
  );

  const selectPriority = elementManager.createSelectElement(
    ['task-content-popup__select-task-priority'],
    {'id': 'task-content-popup__select-task-priority-id'}
  );

  const optionPriority = renderPriorityOption(taskResult.priority);
  elementManager.appendElements(selectPriority, ...optionPriority);
  
  // Buttons
  const divButtonWrapper = elementManager.createDivElement(
    ['task-content-popup__button-wrapper']
  );

  const buttonClose = elementManager.createButtonElement(
    ['task-content-popup__close-button'],
    {'id':'task-content-popup__close_button-id'},
    {innerText: 'Close'}
  );

  const buttonSave = elementManager.createButtonElement(
    ['task-content-popup__save-button'],
    {'id':'task-content-popup__save_button-id'},
    {innerText: 'Save'}
  );
  
  

  elementManager.appendElements(
    divButtonWrapper,
    buttonSave,
    buttonClose,
  );
  elementManager.appendElements(
    divContent,
    inputTaskName,
    selectProject,
    textareaDescription,
    inputDate,
    selectPriority,
    divButtonWrapper,
  );
  elementManager.appendElements(divTaskPopupWrapper, divContent);
  // Close button Event
  closeButtonClick();

  // Save Button Event
  saveButtonClick(taskId);
}

// function todayEditButtonClick() {
//   const todayContentEditButton = document.querySelectorAll('.content-edit-button__edit-button');
//     todayContentEditButton.forEach(editButton => {
//       editButton.addEventListener('click', () => {
//         const taskId = editButton.getAttribute('data-id');
//         editPopupView(taskId);
//         const popup = document.getElementById('task-edit-popup');      
//         popup.style.display = 'flex';
//       });
//     });
// }

function editPopup(taskId) {
  //todayEditButtonClick();  
  editPopupView(taskId);
}

export { editPopup }