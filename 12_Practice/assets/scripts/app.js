
class Tooltip {}

class ProjectItem {
  constructor(projectId) {
    this.id = projectId;
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    const prjItems = document.querySelectorAll(`#${type}-projects li`)
    for (const project of prjItems){
      this.projects.push(new ProjectItem(project.id));
    }
    console.log(this.projects);    
  }

  connectMoreButton(){

  }
  
  connectSwitchButton(){

  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");
  }
}

App.init();
