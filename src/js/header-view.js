import { homeIcon, hamburgerMenuIcon } from './icons';

function createHeaderSection(headerElement, sectionNames) {
  sectionNames.forEach((section) => {
    const sectionElement = document.createElement('section');
    sectionElement.classList.add(section);
    headerElement.appendChild(sectionElement);
  });
}

function createHamburgerMenu(leftSection) {
  const divHamburgerMenuBtn = document.createElement('button');
  divHamburgerMenuBtn.classList.add('header-left-section__hamburger-menu');
  divHamburgerMenuBtn.innerHTML = hamburgerMenuIcon();
  leftSection.appendChild(divHamburgerMenuBtn);
}

function createHomeButton(leftSection) {
  const divHomeBtn = document.createElement('button');
  divHomeBtn.classList.add('header-left-section__home-button');
  divHomeBtn.innerHTML = homeIcon();
  leftSection.appendChild(divHomeBtn);
}

export default function headerView() {
  const headerElement = document.querySelector('header');
  createHeaderSection(headerElement, ['header-left-section', 'header-right-section']);

  const leftSection = headerElement.querySelector(':first-child');
  createHamburgerMenu(leftSection);
  createHomeButton(leftSection);
}

