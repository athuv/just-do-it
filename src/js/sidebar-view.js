import { todayIcon, comingWeekIcon, dotIcon, addIcon, toggleIcon, editIcon, deleteIcon } from './icons';
import Project from './project';

function sidebarTodayComingWeek(asideElement) {
  const ul = document.createElement('ul');
  ul.classList.add('sidebar-buttons');
  const liNames = ['Today', 'Coming Week'];

  liNames.forEach((name) => {
    const li = document.createElement('li');
    const liClass = name.toLowerCase().replace(/\s/g,'-');
    li.classList.add('sidebar-buttons__button', `sidebar-buttons__${liClass}`);
    const spanElement = document.createElement('span');
    spanElement.classList.add('sidebar-buttons__button__contents');
    if(name === 'Today'){
      spanElement.innerHTML = `${todayIcon()} <p>${name}</p> `;
    }

    if(name === 'Coming Week'){
      
      spanElement.innerHTML = `${comingWeekIcon()} <p>${name}</p> `;
    }
    li.appendChild(spanElement);
    ul.appendChild(li);
  });
  asideElement.appendChild(ul);
}

function projects(asideElement, project) {
  const divElement = document.createElement('div');
  divElement.classList.add('sidebar-project-heading');

  const pElement = document.createElement('p');
  pElement.textContent = 'Projects';
  pElement.classList.add('sidebar-project-heading__text');

  const divHeaderButton = document.createElement('div');
  divHeaderButton.classList.add('sidebar-project-heading__button-group');

  const buttonAdd = document.createElement('button');
  buttonAdd.classList.add('sidebar-project-heading__button');
  buttonAdd.innerHTML = addIcon();

  const buttonToggle= document.createElement('button');
  buttonToggle.classList.add('sidebar-project-heading__button');
  buttonToggle.innerHTML = toggleIcon();


  divElement.appendChild(pElement);
  divElement.appendChild(divHeaderButton);
  divHeaderButton.appendChild(buttonAdd);
  divHeaderButton.appendChild(buttonToggle);

  const ulElement = document.createElement('ul');
  ulElement.classList.add('sidebar-project-buttons');

  const projectData = project.getProject();
    
  projectData.forEach((project) =>{
    const liElement = document.createElement('li');
    liElement.classList.add('sidebar-project-buttons__button');
   

    const spanElement = document.createElement('span');
    spanElement.classList.add('sidebar-buttons__button__contents');

    spanElement.innerHTML = `${dotIcon()} <p>${project.name}</p> `;

    const divEditDeleteButton = document.createElement('div');
    divEditDeleteButton.classList.add('button__edit-delete-buttons');
    spanElement.appendChild(divEditDeleteButton);

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button__edit-delete-buttons__edit');
    buttonEdit.innerHTML = editIcon();
    buttonEdit.setAttribute('data-id', project.id);
    divEditDeleteButton.appendChild(buttonEdit);

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button__edit-delete-buttons__delete');
    buttonDelete.innerHTML = deleteIcon();
    buttonDelete.setAttribute('data-id', project.id);
    divEditDeleteButton.appendChild(buttonDelete);
    
    liElement.appendChild(spanElement);    
    ulElement.appendChild(liElement);
  }); 

  asideElement.appendChild(divElement);
  asideElement.appendChild(ulElement);
}

export default function sidebarView() { 
  const project = new Project();
  const mainElement = document.querySelector('main');
  const asideElement = mainElement.querySelector(':first-child');
  
  sidebarTodayComingWeek(asideElement);
  projects(asideElement, project);

}