class Tooltip {}

class ProjectItem {
  constructor(id) {
    this.id = id;
    this.projectItemElement = document.getElementById(this.id);
    this.connectMoreButton();
    this.connectSwitchButton();
  }
  handlerMoreBtn(){
    alert("hello")
  }

  connectMoreButton() {
    const moreBtn = this.projectItemElement.querySelector('.alt');
    moreBtn.addEventListener('click', this.handlerMoreBtn)
  }

  connectSwitchButton() {
    const finishBtn = this.projectItemElement.querySelector('button:last-of-type');
    finishBtn.addEventListener('click', this.handlerMoreBtn)
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems){
      this.projects.push(new ProjectItem(prjItem.id));
    }
    console.log(this.projects);
  }

  addProject(id) {
    
  }

  switchProject(projectId) {}

}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");
  }
}

App.init();
