import { observable, action, configure, flow } from 'mobx';
import { loginService } from '../services';

configure({
  enforceActions: 'always'
});

class login{
  @observable isLoading = false;
  @observable isLogin = false;

  @action
  login = flow( function* login(params){
    this.isLoading = true;
    try{
      const response = yield loginService.login(params);
      console.log(response)
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
}

export default new login();
