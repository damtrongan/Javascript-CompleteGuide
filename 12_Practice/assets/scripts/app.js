class Tooltip {}

class ProjectItem {
  constructor(id) {
    this.id = id;
    this.projectItemElement = document.getElementById(this.id);
    this.connectMoreButton();
    this.connectSwitchButton();
  }
  
  handlerMoreButton(){
    alert("hello")
  }

  handlerLastBtn(){
     
  }

  connectMoreButton() {
    const moreBtn = this.projectItemElement.querySelector('.alt');
    moreBtn.addEventListener('click', this.handlerLastBtn)
  }

  connectSwitchButton() {
    const lastBtn = this.projectItemElement.querySelector('button:last-of-type');
    lastBtn.addEventListener('click', this.handlerLastBtn)
  }

}

class ProjectList {
  projects = [];
  constructor(type) {
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems){
      this.projects.push(new ProjectItem(prjItem.id));
    }
  }

  addProject(id) {
    
  }

  switchProject(projectId) {

  }

}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");
  }
}

App.init();
