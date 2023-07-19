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

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
    console.log(this);
  }

  detach() {
    if (this.element) {
      this.element.remove();
    }
    this.element.remove();
    //this.element.parentElement.removeChild(this.element);
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "beforebegin" : "beforeend",
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction) {
    super('finished-projects', true);
    this.closeNotifier = closeNotifierFunction;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = "aaa";
    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
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

  handlerMoreBtn() {
    const tooltip = new Tooltip();
    tooltip.attach();
    
  }

  connectMoreButton() {
    const moreBtn = this.projectEl.querySelector("button:first-of-type");
    
    moreBtn.addEventListener('click', this.handlerMoreBtn);
  }

  connectSwitchButton(type) {
    let switchBtn = this.projectEl.querySelector("button:last-of-type");
    console.log(this);
    switchBtn = DOMHelper.clearEventsListeners(switchBtn);
    switchBtn.textContent = type === "active" ? "Activate" : "Finish";
    switchBtn.addEventListener(
      "click",
      this.functionSwitchProject.bind(null, this.id),
      this.type
    );
  }

  update(functionHandleProject, type) {
    this.functionSwitchProject = functionHandleProject;
    this.connectSwitchButton(type);
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
    //console.log(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.swapProject.bind(this), this.type);
  }

  swapProject(projectId) {
    /* 
      1. Đẩy project từ Active sang Finish Class
      2. Remove project trong active
    **/
    //console.log(this);
    this.switchProjectFunction(this.projects.find((p) => p.id === projectId));
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
