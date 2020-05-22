import { observable, action, configure, flow } from 'mobx';

configure({
  enforceActions: 'always'
});

class app{
  @observable isReady = false;

  @action
  setIsReady = (data) => {
    this.isReady = data;
  };

}

export default new app();
