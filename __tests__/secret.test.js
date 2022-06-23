const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};
  
const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
    
  // Create an "agent" that gives us the ability
  // to store cookies between requests in a test
  const agent = request.agent(app);
  
    
  // create a user to sign in with
  const user = await UserService.create({ ...mockUser, ...userProps });
    
  // ... then sign in 
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });
  
  it.skip('/api/v1/secrets signs user in and returns list of secrets', async () => {
    // const [agent] = await registerAndLogin();
    // const resp = await agent.get('/api/v1/secrets');
    // expect(resp.status).toEqual(200);
    // expect(resp.body).toEqual([
    //   {
    //     id: '1',
    //     title: 'Secret #1',
    //     description: 'Do not tell anyone',
    //     created_at: expect.any(String),
    //   },
    //   {
    //     id: '2',
    //     title: 'Secret #2',
    //     description: 'Maybe tell one person',
    //     created_at: expect.any(String),
    //   },
    //   {
    //     id: '3',
    //     title: 'Secret #3',
    //     description: 'Maybe tell a few people',
    //     created_at: expect.any(String),
    //   },
    //   {
    //     id: '4',
    //     title: 'Secret #4',
    //     description: 'Tell anyone, not really a secret',
    //     created_at: expect.any(String),
    //   },
    // ]);
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

  it('should return a 401 when signed in and listing all secrets', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/secrets');
    expect(res.body).toEqual({
      message: 'You must be signed in to continue',
      status: 401,
    });
  });
});
