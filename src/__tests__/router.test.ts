import app from '../server';
import supertest from 'supertest';

describe('GET /', () => {
  it('should recive proper data', async () => {
    const res = await supertest(app).get('/');

    expect(res.body.data).toBe('it works');
  });
});
