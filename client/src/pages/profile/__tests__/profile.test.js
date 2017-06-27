import configureMockStore from 'redux-mock-store';

import ProfilePage, {Profile} from '../index';

const mockStore = configureMockStore();

const user = {
  id: '0',
  login: 'test',
  registrationDate: new Date(2017, 1, 1, 1, 1, 1, 1),
};

test('# Profile page wrapper', () => {
  const store = mockStore({auth: {user}, users: {user}});
  const wrapper = shallow(<ProfilePage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Profile page', () => {
  const getUser = (u) => {
    expect(u).toEqual(user);
  }

  const component = (
    <Profile
      getUser={getUser}
      params={user}
      user={user}
      loadedUser={user}
    />
  );

  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();
})
