
class Tooltip {}

class ProjectItem {
  constructor(project) {

  }
}

class ProjectList {
  constructor(type) {
    const prjItems = document.querySelector(`#${type}-projects`)
    console.log(prjItems);
    
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
