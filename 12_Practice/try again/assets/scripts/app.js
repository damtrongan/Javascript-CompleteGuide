class DOMHelper {
  static clearEventsListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    console.log(element);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    console.log(destinationElement);
  }
}

class Component {
  constructor(rootId, cssClass, attributes){
    const rootElement = document.getElementById(rootId);
    rootElement.className = cssClass;
    if(attributes){
      for(const attr of attributes){
        rootElement.attributes = attr;
      }
    }
  }
}

class ProjectItem {
  constructor(id, functionSwitchProject, type) {
    this.id = id;
    this.projectEl = document.getElementById(this.id);
    this.functionSwitchProject = functionSwitchProject;
    this.connectMoreButton();
    this.connectSwitchButton(type);
  }

  handlerMoreBtn() {}

  handlerSwitchBtn(type) {
    const switchBtn = this.projectEl.querySelector("button:last-of-type");
    console.log(switchBtn.textContent);
    switchBtn.textContent = type === 'active' ?  'Activate' : 'Finish';
    DOMHelper.clearEventsListeners(this.projectEl);
    this.functionSwitchProject(this.id);
      
  }

  connectMoreButton() {
    const moreBtn = this.projectEl.querySelector("button:first-of-type");
  }

  connectSwitchButton(type) {
    const finishBtn = this.projectEl.querySelector("button:last-of-type");
    finishBtn.addEventListener("click", this.handlerSwitchBtn.bind(null ,this.id));
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    let projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const project of projectItems) {
      this.projects.push(
        new ProjectItem(project.id, this.swapProject.bind(this), this.type)
      );
    }
    //console.log(this.projects);

  }

  setSwitchProjectHandler(switchProjectFunction) {
    this.switchProjectFunction = switchProjectFunction;
  }

  addProject(project) {
    // project.type = "active"? 'finished' : 'active'
    this.projects.push(project);
    console.log(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    
  }

  swapProject(projectId) {
    /* 
      1. Đẩy project từ Active sang Finish Class
      2. Remove project trong active
    **/
    this.switchProjectFunction(this.projects.find(p => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");

    activeProjectList.setSwitchProjectHandler(
      finishedProjectList.addProject.bind(finishedProjectList)
    );

    finishedProjectList.setSwitchProjectHandler(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }
}
App.init();
