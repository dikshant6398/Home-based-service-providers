import url from '../url';

export const host = url;
export const loginRouteUser = `${host}/api/client/signin`;
export const signUpRouteUser = `${host}/api/client/signup`;
export const signUpRouteProvider = `${host}/api/provider/signup`;
export const logInRouteProvider = `${host}/api/provider/signin`;
export const editUser = `${host}/api/client/edituser`;
export const editProvider = `${host}/api/provider/edit`;