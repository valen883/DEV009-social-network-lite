// importamos la funcion que vamos a testear
import {
  register,
  login,
  getLoggedInUser,
  createPost,
  getPosts,
  logout,
  editPost,
}
  from '../src/lib/index';
import { init } from '../src/lib/services';

// simulacion de datos necesarios antes de correr las pruebas
beforeEach(() => {
  const users = [{ email: 'usuario@ejemplo.com', password: '123456' }];
  const loggedInUser = { email: 'usuario@ejemplo.com', password: '123456' };
  const posts = [
    { id: 'posta', content: 'contenidoa', email: 'usuarioa@ejemplo.com' },
    { id: 'postb', content: 'contenidob', email: 'usuariob@ejemplo.com' },
  ];

  // variable global simulando el comportamiento del almacenamiento local
  global.localStorage = {
    // devuelve diferentes valores dependiendo de la clave proporcionada
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
    // guarda un valor asociado a una clave específica
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
    localStorage.getItem.mockReturnValueOnce(null);
    const result = register('usuario@ejemplo.com', '123456');
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
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([{ email: 'usuarioa@ejemplo.com', password: '123456' }]));
    expect(() => {
      register('usuarioa@ejemplo.com', '123456');
    }).toThrow('User already exists');
  });
});

// TEST para la funcion login
describe('Login funcion', () => {
  it('Debe devolver true para credenciales válidas', () => {
    const result = login('usuario@ejemplo.com', '123456');

    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ email: 'usuario@ejemplo.com', password: '123456' }));
  });

  it('Debe devolver undefined para credenciales inválidas', () => {
    const result = login('usuario@ejemplo.com', 'nopassword');
    expect(result).toBeUndefined();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('Debe devolver false cuando no hay usuarios', () => {
    // simula que no hay usuarios en localStorage
    localStorage.getItem.mockReturnValueOnce(null);

    const result = login('noemail@example.com', 'nopassword');

    expect(result).toBe(false);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});

// TEST para la funcion getLoggedInUser
describe('getLoggedInUser funcion', () => {
  it('Debe devolver el usuario conectado ', () => {
    const result = getLoggedInUser();
    expect(result).toEqual({ email: 'usuario@ejemplo.com', password: '123456' });
  });

  it('Debe devolver null si no hay ningún usuario conectado', () => {
    localStorage.getItem.mockReturnValueOnce(null);
    const result = getLoggedInUser();
    expect(result).toBeNull();
  });
});

// TEST para la funcion createPost
describe('createPost funcion', () => {
  it('Debería crear una post', () => {
    const id = createPost('validpost', 'usuario@ejemplo.com');
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);

    const existingPosts = [
      { id: 'posta', content: 'contenidoa', email: 'usuarioa@ejemplo.com' },
      { id: 'postb', content: 'contenidob', email: 'usuariob@ejemplo.com' },
    ];

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'posts',
      JSON.stringify([...existingPosts, { id, content: 'validpost', email: 'usuario@ejemplo.com' }]),
    );
  });

  it('Debe arrojar un error con contenido demasiado corto', () => {
    expect(() => {
      createPost('', 'test@example.com');
    }).toThrow('Content must be at least 1 character long');
  });

  it('Debería lanzar un error con un email inválido', () => {
    expect(() => {
      createPost('validcontent', 'noemail');
    }).toThrow('Invalid email');
  });

  it('Debe guardar los posts en el localStorage', () => {
    const beforePosts = [{
      id: 'anID',
      content: 'beforecontent',
      email: 'before@example.com',
    }];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(beforePosts));

    const id = createPost('validcontenta', 'usuario@ejemplo.com');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'posts',
      JSON.stringify([...beforePosts, { id, content: 'validcontenta', email: 'usuario@ejemplo.com' }]),
    );
  });
});

// TEST para la funcion getPosts
describe('getPosts funcion', () => {
  it('Retorna un array vacío si no hay entradas en localStorage', () => {
    // Mock para simular que no hay posts en localStorage
    localStorage.getItem.mockReturnValueOnce(null);

    const result = getPosts();
    expect(result).toEqual([]);
  });

  it('Retorna un array con los posts si existen en localStorage', () => {
    const mockPosts = [
      { id: 'posta', content: 'contenidoa', email: 'usuarioa@ejemplo.com' },
      { id: 'postb', content: 'contenidob', email: 'usuariob@ejemplo.com' },
    ];

    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockPosts));

    const result = getPosts();
    expect(result).toEqual(mockPosts);
  });
});

// TEST para la funcion logout
describe('Logout funcion', () => {
  it('Debe cerrar la sesión del usuario de localStorage', () => {
    // Se llama a la función que se quiere testear
    logout();

    // Se verifica que removeItem haya sido llamado con el argumento correcto
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });
});

// TEST para la funcion editPost
describe('editPost function', () => {
  it('Should throw an error with too short content', () => {
    expect(() => {
      editPost('someID', '');
    }).toThrow('Content must be at least 1 character long');
  });
});