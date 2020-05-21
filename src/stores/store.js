import { observable, action, configure, flow } from 'mobx';

configure({
  enforceActions: 'always'
});

class store{
  @observable isReady = false;

  @action
  setIsReady = (data) => {
    this.isReady = data;
  };

}

export default new store();
