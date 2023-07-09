
class Tooltip {}

class ProjectItem {
  constructor(project) {

  }
}

class ProjectList {
  constructor(type) {
    const prjItém = document.querySelector(`#${type}-projects`)
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");
  }
}

App.init();
