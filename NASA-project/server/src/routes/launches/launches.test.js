const request = require('supertest');
const app = require('../../app');
describe('Test GET /launches ', () => {
    test('it should respoond with 200 success', async () => {
        const response = await request(app).get('/launches')
        
        expect(response.statusCode).toBe(200);
        
    })
})


describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-62 f',
        launchDate: 'January 4, 2028',
    };

    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-62 f',
    };

    test('it should respond with 201 created', async () => {
        const response = await request(app).post('/launches').send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    })

    test('it should catch missing required properties', async () => {
        const response = await request(app).post('/launches').send({
            launchDataWithoutDate
    
        })
        .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property',
        })
    })

    test('it should catch invalid dates', async () => {
        const response = await request(app)
          .post('/launches')
          .send({
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'abiy biru',
          })
          .expect('Content-Type', /json/)
          .expect(400);
      
        expect(response.body).toStrictEqual({
          error: 'Invalid launch date',
        });
      });
})

describe('Test DELETE /launches', () => {
    test('it should respond with 200 success', async () => {
      const response = await request(app).delete('/launches/100');
      expect(response.statusCode).toBe(200);
    });
  });