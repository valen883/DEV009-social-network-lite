// importamos la funcion que vamos a testear
import { init, register, login } from '../src/lib/index';

//simulacion de datos necesarios antes de correr las pruebas
beforeEach(() => {
  const users = [{ email: 'usuario@ejemplo.com', password: '123456' }];
  const loggedInUser = { email: 'ejemplo@ejemplo.com', password: '123456' };
  const posts = [
    { id: 'posta', content: 'contenidoa', email: 'usuarioa@ejemplo.com' },
    { id: 'postb', content: 'contenidob', email: 'usuariob@ejemplo.com' },
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
describe('init funcion', () => {
  it('Debe borrar el localStorage', () => {
    init();
    expect(localStorage.clear).toHaveBeenCalled();
  });
});



// TEST para la funcion register
describe('Register funcion', () => {
  it('Debe registrar un nuevo usuario', () => {
    localStorage.getItem.mockReturnValueOnce(null); // No hay usuarios previamente registrados
    const result = register('usuario@ejemplo.com','123456');
    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('users', JSON.stringify([{ email: 'usuario@ejemplo.com', password: '123456' }]));
  });

  it('Debería identificar un email inválido', () => {
    expect(() => {
      register('otroUsuario', 'abcdefg3');
    }).toThrow('Invalid email');
  });

  it('Debería identificar una contraseña corta', () => {
    expect(() => {
      register('usuario@ejemplo.com', 'hola');
    }).toThrow('Password must be at least 6 characters long');
  });

  it('Debe verificar si el usuario ya existe', () => {
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([{ email: 'prueba@example.com', password: 'abcdefg' }]));
    expect(() => {
      register('usuarioa@ejemplo.com', '123456');
    }).toThrow('User already exists');
  });
});


describe('Login function', () => {
  it('Should return true for valid credentials', () => {
    const result = login('usuario@ejemplo.com', '123456');

    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ email: 'usuario@ejemplo.com', password: '123456' }));
  });

  it('Should return undefined for invalid credentials', () => {
    const result = login('usuario@ejemplo.com', 'nopassword');
    expect(result).toBeUndefined();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('Should return false when there are no users', () => {
  // simula que no hay usuarios en localStorage
    localStorage.getItem.mockReturnValueOnce(null);

    const result = login('noemail@example.com', 'nopassword');

    expect(result).toBe(false);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});