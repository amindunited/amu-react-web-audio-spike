import {observable, computed} from 'mobx';

class frequencyToTime {
  @observable time = undefined;
  @observable source_frequency = 440;
  @observable source_length = undefined;
  @observable source_length_format = "Beats";
  @observable source_bpm = 120;
  @computed get beatInMs () { return (60000/this.bpm) };
}
class ToolsStore {
    //user;
    //decks;
    //todos;
    constructor () {
      //this.user = new User();
      //this.todos = new TodoList();
      //this.SideBar = new SideBar();
      this.frequencyToTime = new frequencyToTime();
    }
}

export default ToolsStore;