import { observable, action, configure, flow } from 'mobx';
import { scannerService } from '../services';

configure({
  enforceActions: 'always'
});

class scanner{
  @observable show = false;
  @action handlerShow = flag => {
    this.show = flag;
  };

  @observable isLoading = false;
  @observable scanned = 0;
  @observable qrStatus = [];
  @observable qrCurrent = false;
  @observable error = '';

  @observable hasPermission = null;

  @action setScanned = flag => {
    this.scanned = flag;
    if(flag === 0) {
      this.qrCurrent = false;
      this.error = '';
    }
  };

  @action setHasPermission = status => {
    this.hasPermission = status;
  };

  @action setError = (message) => {
    this.error = message;
  };


  @action
  ticketCheck = flow( function* ticketCheck(params){
    this.isLoading = true;
    try{
      const response = yield scannerService.ticketCheck(params);
      if(response === undefined) return;

      this.setScanned(1);
      let flag = false;
      if(this.qrStatus.length > 0) {
        Object.keys(this.qrStatus).map(key => {
          if(JSON.stringify(this.qrStatus[key]) === JSON.stringify(response)){
            flag = true;
          }
        });
      }

      if(!flag) {
        this.qrStatus.push(response);
      }
      this.qrCurrent = response;
    }catch(e){
      this.setScanned(-1);
      this.setError(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
}

export default new scanner();
