// importamos la funcion que vamos a testear
import { init, register } from '../src/lib/index';

//simulacion de datos necesarios antes de correr las pruebas
beforeEach(() => {
  const users = [{ email: 'usuario@example.com', password: '123456' }];
  const loggedInUser = { email: 'usuario@example.com', password: '123456' };
  const posts = [
    { id: 'posta', content: 'contenidoa', email: 'usuarioa@example.com' },
    { id: 'postb', content: 'contenidob', email: 'usuariob@example.com' },
  ];
  global.localStorage = {
    getItem: jest.fn((key) => {
      switch (key) {
        case 'users':
          return JSON.stringify(users);
        case 'user':
          return JSON.stringify(loggedInUser);
        case 'posts':
          return JSON.stringify(posts);
        default:
          return null;
      }
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
});


// test funcion init
describe('init function', () => {
  it('Should clear the localStorage', () => {
    init();
    expect(localStorage.clear).toHaveBeenCalled();
  });
});