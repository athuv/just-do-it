function createElement(tagName, classNames, attributes = {}, content = {}) {
  const element = document.createElement(tagName);

  if(typeof classNames !== 'undefined') {    
    element.classList.add(...classNames);
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  if(content.hasOwnProperty('innerHTML') && content.hasOwnProperty('innerText')) {
    const { innerHTML, innerText } = content;
    element.innerHTML = innerHTML;
    element.innerText = innerText;
  } else if(content.hasOwnProperty('innerHTML')) {
    const { innerHTML } = content;
    element.innerHTML = innerHTML;
  } else if(content.hasOwnProperty('innerText'))  {
    const { innerText } = content;
    element.innerText = innerText;
  }

  return element;
}

function appendElements(parentElement, ...childElements) {
  childElements.forEach((childElement) => {
    parentElement.appendChild(childElement);
  });
}

function createUlElement(classNames, attributes = {}, content) {
  return createElement('ul', classNames, attributes, content);

}

function createLiElement(classNames, attributes = {}, content) {
  return createElement('li', classNames, attributes, content);

}

function createSpanElement(classNames, attributes = {}, content) {
  return createElement('span', classNames, attributes, content);
}

function createButtonElement(classNames, attributes = {}, content) {
  return createElement('button', classNames, attributes, content);
};

function createDivElement(classNames, attributes = {}, content) {
  return createElement('div', classNames, attributes, content);
};

function createPElement(classNames, attributes = {}, content){
  return createElement('div', classNames, attributes, content);
}

function createSectionElement(classNames, attributes = {}, content) {
  return createElement('section', classNames, attributes, content);
}

function createH3Element(classNames, attributes = {}, content) {
  return createElement('h3', classNames, attributes, content);
}

function createInputElement(classNames, attributes = {}, content) {
  return createElement('input', classNames, attributes, content);
}

function createSelectElement(classNames, attributes = {}, content) {
  return createElement('select', classNames, attributes, content);
}

function createOptionElement(classNames, attributes = {}, content) {
  return createElement('option', classNames, attributes, content);
}

function createTextareaElement(classNames, attributes = {}, content) {
  return createElement('textarea', classNames, attributes, content);
}

export  { 
          createUlElement,
          createLiElement,
          createSpanElement,
          createButtonElement,
          createDivElement,
          appendElements,
          createPElement,
          createSectionElement,
          createH3Element,
          createInputElement,
          createSelectElement,
          createOptionElement,
          createTextareaElement,
        }