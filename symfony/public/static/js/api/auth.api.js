import { createFormDataObj } from '../utils';
import { baseInstance } from './index';

export const signUp = userInfo =>
  baseInstance({
    url: '/registration',
    method: 'post',
    data: userInfo,
  });

export const signIn = credentials =>
  baseInstance({
    url: '/login',
    method: 'post',
    data: credentials,
  });

export const inviter = params =>
  baseInstance({ url: '/inviter', method: 'get', params });
