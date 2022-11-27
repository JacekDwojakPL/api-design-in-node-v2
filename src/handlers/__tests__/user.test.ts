import * as user from '../user';

describe('user handler suite', () => {
  it('should create new user', async () => {
    const req = {
      body: {
        username: 'test user 2',
        password: 'password_test',
      },
    };

    const res = {
      json: ({ token }) => {
        expect(token).toBeTruthy();
      },
    };

    await user.createNewUser(req, res, (e) => {
      expect(e).toHaveProperty('message');
    });
  });
});
