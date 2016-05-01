import { login, ACTION_LOGIN } from '../src/actions';
import nock from 'nock';
import expect from 'expect';

const API_ROOT = 'http://api.knocknockapp.com/';

describe('Action unit tests', function () {
  afterEach(() => {
    nock.cleanAll()
  });

	it(ACTION_LOGIN, done => {
    nock(API_ROOT)
      .get('/api/oauth/token')
      .reply(200, { body: { todos: ['do something'] }})

    const expectedActions = [
      { type: ACTION_LOGIN },
      { type: ACTION_LOGIN, data: { todos: ['do something'] }}
    ];
    const store = mockStore({ todos: [] });

    store.dispatch(login({
    	username: 'ruiqi.sg@gmail.com',
    	password: '0293248094'
    }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
      .then(done)
      .catch(done)
	});
});