/* Importado de Bibliotecas */
const request = require('supertest');
const app = require('.app');

/* Tests unitarios para usuarios */
describe('users', () => {

    // Variables necesarias
    var token = ""
    var id = ""

    // POST (Register)
    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ "name": "Menganito", "email": "user25@test.com", "password": "Holamundo.01" })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.user.email).toEqual('user25@test.com')
        expect(response.body.user.role).toEqual('user')
        token = response.body.token
        id = response.body.user._id
    })

    // GET (All)
    it('should get the users', async () => {
        const response = await request(app)
            .get('/api/auth/users')
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.pop().name).toEqual('Menganito')
    })

    // DELETE (All)
    it('should delete a user', async () => {
        const response = await request(app)
            .delete('/api/auth/users/' + id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.acknowledged).toEqual(true)
    })
})
