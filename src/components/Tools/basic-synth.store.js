import {observable, computed} from 'mobx';

/*
class frequencyToTime {
  @observable time = undefined;
  @observable source_frequency = 440;
  @observable source_length = undefined;
  @observable source_length_format = "Beats";
  @observable source_bpm = 120;
  @computed get beatInMs () { return (60000/this.bpm) };
}
*/
class BasicSynthStore {
  @observable waveform = 'sine';
}

export default BasicSynthStore;