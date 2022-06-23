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
  
  it('/api/v1/secrets returns list of secrets', async () => {
    const resp = await request(app).get('/api/v1/secrets');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        title: 'Secret #1',
        description: 'Do not tell anyone',
        created_at: expect.any(String),
      },
      {
        id: '2',
        title: 'Secret #2',
        description: 'Maybe tell one person',
        created_at: expect.any(String),
      },
      {
        id: '3',
        title: 'Secret #3',
        description: 'Maybe tell a few people',
        created_at: expect.any(String),
      },
      {
        id: '4',
        title: 'Secret #4',
        description: 'Tell anyone, not really a secret',
        created_at: expect.any(String),
      },
    ]);
  });

  it('POST /api/v1/secrets should create a new secret', async () => {
    const resp = await request(app).post('/api/v1/secrets').send({
      title: 'Secret #5',
      description: 'The biggest secret in the world',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.title).toEqual('Secret #5');
    expect(resp.body.description).toEqual('The biggest secret in the world');
    expect(resp.body.id).not.toBeUndefined();
  });
   
});
