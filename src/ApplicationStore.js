import {observable, computed} from 'mobx';

class SideBar {
  @observable open = false;
}
class ApplicationStore {
    //user;
    //decks;
    //todos;
    constructor () {
      //this.user = new User();
      //this.todos = new TodoList();
      this.SideBar = new SideBar();
    }
}

export default ApplicationStore;