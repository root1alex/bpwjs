import Navbar from '../index';

test('# Navbar', () => {
  const wrapperRoot = shallow(<Navbar current="/" />);
  expect(wrapperRoot).toMatchSnapshot();

  const wrapperCreate = shallow(<Navbar user="/create" />);
  expect(wrapperCreate).toMatchSnapshot();

  const wrapperUser = shallow(
    <Navbar user={{login: 'test'}} current="/profile/me" />
  );
  expect(wrapperUser).toMatchSnapshot();
});
