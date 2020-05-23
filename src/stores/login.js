import { observable, action, configure, flow } from 'mobx';
import { loginService } from '../services';

configure({
  enforceActions: 'always'
});

class login{
  @observable isLoading = false;

  @observable token = null;
  @observable user = null;

  @action setUserData = flow( function* setUserData(){
    this.token = yield loginService.getToken() || null;
    this.user = yield loginService.getUser() || null;
  }).bind(this);

  @observable loginInputValue = '';
  @observable passInputValue = '';
  @action setInputLogin = val => {this.loginInputValue = val};
  @action setInputPass = val => {this.passInputValue = val};

  @action
  login = flow( function* login(navigation){
    if (this.isLoading) return null;
    if(!this.loginInputValue || !this.passInputValue){
      alert('Заполните все поля');
      return null;
    }

    this.isLoading = true;
    try{
      const response = yield loginService.login({username: this.loginInputValue, password: this.passInputValue});
      this.token = response.token;
      this.user = {
        name: response.user_display_name,
        email: response.user_email,
        nicename: response.user_nicename
      };

      loginService.setToken(this.token);
      loginService.setUser(this.user);

      navigation.navigate('Home');
    }catch(e){
      alert('Неудалось авторизаваться. Неверный логин или пароль.')
    }finally {
      this.isLoading = false;
    }
  }).bind(this);

  @action
  validate = flow( function* validate(navigation){
    if (this.isLoading) return null;
    if(!this.token){
      navigation.replace('Login');
    }

    this.isLoading = true;
    try{
      const response = yield loginService.validate(this.token);

      if(response && response.data && response.data.status && response.data.status === 200){
        navigation.navigate('Home');
      }else{
        loginService.clear();
        navigation.navigate('Login');
      }
    }catch(e){
      console.log(e);
      loginService.clear();
      navigation.replace('Login');
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
}

export default new login();
