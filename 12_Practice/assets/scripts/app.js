class Tooltip {}

class ProjectItem {
  constructor(id) {
    this.id = id;
    this.projectItemElement = document.getElementById(this.id);
    this.connectMoreButton();
    this.connectSwitchButton();
  }

  handlerMoreButton() {
    alert("hello");
  }

  handlerLastBtn() {}

  connectMoreButton() {
    const moreBtn = this.projectItemElement.querySelector(".alt");
    moreBtn.addEventListener("click", this.handlerLastBtn);
  }

  connectSwitchButton() {
    const finishBtn = this.projectItemElement.querySelector(
      "button:last-of-type"
    );
    finishBtn.addEventListener("click", this.handlerMoreBtn);
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(new ProjectItem(prjItem.id));
    }
    //console.log(this.projects);
  }

  setSwitchHandlerFunc(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(projectId) {}

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex((p) => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find(p => p.id === projectId));
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
