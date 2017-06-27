import configureMockStore from 'redux-mock-store';

import RegisterPage, {Register} from '../index';

const mockStore = configureMockStore();

test('# Register page wrapper', () => {
  const store = mockStore({auth: {redirectToLogin() {}}});
  const wrapper = shallow(<RegisterPage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Register page', () => {
  const newLogin = 'login123';
  const newPass = 'pwd123';
  const onRegisterClick = ({login, password, passwordRepeat}) => {
    expect(login).toBe(newLogin);
    expect(password).toBe(newPass);
    expect(passwordRepeat).toBe(newPass);
  };
  const navToLogin = () => expect(true).toBeTruthy();
  const redirectToLogin = 'true';

  const component = (
    <Register
      onRegisterClick={onRegisterClick}
      navToLogin={navToLogin}
      redirectToLogin={redirectToLogin}
    />
  );

  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // mount 
  const app = mount(component);
  app.find('#inputUsername').getDOMNode().value = newLogin;
  app.find('#inputPassword').getDOMNode().value = newPass;
  app.find('#inputPasswordRepeat').getDOMNode().value = newPass;
  // click register button
  app.find('button').simulate('click');
});
