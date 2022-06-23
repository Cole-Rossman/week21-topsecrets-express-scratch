const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


describe('fish routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });
  
  it('/api/v1/secrets', async () => {
    const resp = await request(app).get('/api/v1/secrets');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        title: 'Secret #1',
        description: 'Do not tell anyone',
      },
      {
        id: '2',
        title: 'Secret #2',
        description: 'Maybe tell one person',
      },
      {
        id: '3',
        title: 'Secret #3',
        description: 'Maybe tell a few people',
      },
      {
        id: '4',
        title: 'Secret #4',
        description: 'Tell anyone, not really a secret',
      },
    ]);
  });
   
});
