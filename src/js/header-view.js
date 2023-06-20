import { homeIcon, hamburgerMenuIcon } from './icons';
import * as elementManager from './utils-view';

function createHeaderSection() {
  const div = elementManager.createDivElement();
  const sectionNames = ['header-left-section', 'header-right-section'];
  sectionNames.forEach((section) => {
    const sectionElement = elementManager.createSectionElement([section]);
    elementManager.appendElements(div, sectionElement);
  });
  return div;
}

function createHamburgerMenu() {
  const div = elementManager.createButtonElement(
    ['header-left-section__hamburger-menu'],
    {},
    {innerHTML: hamburgerMenuIcon()}
  );
    return div;
}

function createHomeButton() {
  const div = elementManager.createButtonElement(
    ['header-left-section__home-button'],
    {},
    {innerHTML: homeIcon()}
  );
  return div;
}

export default function headerView() {
  const headerElement = document.querySelector('header');
  elementManager.appendElements(headerElement, createHeaderSection());

  const leftSection = document.querySelector('section:nth-child(1)');
  elementManager.appendElements(leftSection, createHamburgerMenu(), createHomeButton());
}

