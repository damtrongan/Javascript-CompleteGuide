class DOMHelper {
  static clearEventsListeners(element){
    const clonedElement = element.cloneNode(true);
    console.log(clonedElement);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector){
    const element = document.getElementById(elementId);
    console.log(element);
    const destinationElement = document.querySelector(newDestinationSelector);
    console.log(destinationElement);
    destinationElement.append(element);
  }
}

class Tooltip {}

class ProjectItem {
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.projectItemElement = document.getElementById(this.id);
    this.connectMoreButton();
    this.connectSwitchButton(type);
  }
  
  connectMoreButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector('button:first-of-type')
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventsListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : "Activate";
    switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id), this.type )  
  }

  update(updateProjectListFn, type){
    this.updateProjectListsHandler = updateProjectListFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems){
      this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)));
    }
  }

  setSwitchHandlerFunc(switchHandlerFunction){
    this.switchHandlerFunction = switchHandlerFunction;  
  }

  addProject(project) { 
    this.projects.push(project)
    console.log(this.type);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`)
    project.update(this.switchProject.bind(this), this.type)
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandlerFunction(this.projects.find(p => p.id === projectId))
    this.projects = this.projects.filter(p => p.id !== projectId);
  }

}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");
    activeProjectList.setSwitchHandlerFunc(finishedProjectList.addProject.bind(finishedProjectList));
    finishedProjectList.setSwitchHandlerFunc(activeProjectList.addProject.bind(activeProjectList)); 
  }
}

App.init();
