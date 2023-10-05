// importamos la funcion que vamos a testear
import { init } from '../src/lib/services';

describe('clearStorage', () => {
  it('debería limpiar la información de localStorage', () => {
    expect(typeof init).toBe('function');
  });
});
