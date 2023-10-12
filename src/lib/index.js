// aqui exportaras las funciones que necesites

import {
  createPost,
  deletePost,
  editPost,
  getPosts,
  login,
  register,
  getLoggedInUser,
  logout,
}
  from './services';

export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};

export {
  createPost,
  deletePost,
  editPost,
  getPosts,
  login,
  register,
  getLoggedInUser,
  logout,
};