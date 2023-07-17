class DOMHelper {
  static clearEventsListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

class ProjectItem {
  constructor(id, functionSwitchProject) {
    this.id = id;
    this.projectEl = document.getElementById(this.id);
    this.functionSwitchProject = functionSwitchProject;
    this.connectMoreButton();
    this.connectSwitchButton();
  }

  handlerMoreBtn() {}

  handlerSwitchBtn() {
    console.log(this.id);
    this.functionSwitchProject(this.id);

  }

  connectMoreButton() {
    const moreBtn = this.projectEl.querySelector("button:first-of-type");
  }

  connectSwitchButton() {
    const finishBtn = this.projectEl.querySelector("button:last-of-type");
    finishBtn.addEventListener("click", this.handlerSwitchBtn.bind(this));
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    let projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const project of projectItems) {
      this.projects.push(
        new ProjectItem(project.id, this.swapProject.bind(this))
      );
    }
    //console.log(this.projects);
  }

  setSwitchProjectHandler(switchProjectFunction) {
    this.switchProjectFunction = switchProjectFunction;
  }

  addProject(projectId) {
    this.projects.push(projectId);
    console.log(this.projects);
    DOMHelper.moveElement(projectId, `#${this.type}-projects ul`);
  }

  swapProject(projectId) {
    /* 
      1. Đẩy project từ Active sang Finish Class
      2. Remove project trong active
    **/
    this.switchProjectFunction(this.projects.find(p => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
    console.log(this.projects);
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");

    activeProjectList.setSwitchProjectHandler(
      finishedProjectList.addProject
    );

    finishedProjectList.setSwitchProjectHandler(
      activeProjectList.addProject
    );
  }
}
App.init();
