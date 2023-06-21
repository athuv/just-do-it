
import { task } from './utils';
import { format } from 'date-fns';
import * as elementManager from './utils-view';

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

function renderTodayTasks() {
  const taskInstance = task();
  const todayTasks = taskInstance.todayTasks();
  
  const divTodayTasks = elementManager.createDivElement(['today-content__tasks-wrapper']);
  const ul = elementManager.createUlElement(['today-content__tasks-list']);
  todayTasks.forEach((task) => {
    const li = elementManager.createLiElement(
      ['today-content__tasks-item'],
      {},
      {innerText: task.name}
      );
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
  });
  // console.log(todayButton);
  // const t = task();
  // console.log(t.todayTasks());
}