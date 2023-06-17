import { homeIcon, hamburgerMenuIcon } from './icons';

export default function headerView() {
  const headerElement = document.querySelector('header');
  const sections = ['header-left-section', 'header-right-section'];

  sections.forEach((section) => {
    const sectionElement = document.createElement('section');
    sectionElement.classList.add(section);
    headerElement.appendChild(sectionElement);
  });

  const leftSection = headerElement.querySelector(':first-child');

  const divHamburgerMenuBtn = document.createElement('button');
  divHamburgerMenuBtn.classList.add('header-left-section__hamburger-menu');
  divHamburgerMenuBtn.innerHTML = hamburgerMenuIcon();
  leftSection.appendChild(divHamburgerMenuBtn);

  const divHomeBtn = document.createElement('button');
  divHomeBtn.classList.add('header-left-section__home-button');
  divHomeBtn.innerHTML = homeIcon();
  leftSection.appendChild(divHomeBtn);
  
  const main = document.querySelector('main');
  const as = main.querySelector(':first-child');
  as.textContent = 'Projects';
}