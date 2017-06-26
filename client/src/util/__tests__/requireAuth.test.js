import {requireAuth} from '../requireAuth';

test('# loginErrorToMessage', () => {
  requireAuth({location: {pathname: 'test'}}, (obj) => {
    expect(obj.pathname).toBe('/login');
    expect(obj.state.nextPathname).toBe('test');
  });
});
