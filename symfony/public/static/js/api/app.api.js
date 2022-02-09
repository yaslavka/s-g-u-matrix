import { baseInstance } from './index';

export const userInfo = () => baseInstance({ url: '/api/user-profile', method: 'get' });

export const changeUserInfo = data =>
  baseInstance({ url: '/api/user-profile/fio', method: 'post', data });

export const changePassword = data =>
  baseInstance({ url: '/api/user-profile/password', method: 'post', data });

export const changeFinancePassword = data =>
  baseInstance({ url: '/api/settings/fin-password', method: 'post', data });

export const changeSocial = data =>
  baseInstance({ url: '/api/user-profile/links', method: 'post', data });

export const changeDescription = data =>
  baseInstance({ url: '/api/user-profile/description', method: 'post', data });

export const uploadImageToTelegram = blobImage => {
  const formData = new FormData();
  formData.append('file', blobImage);
  return baseInstance({
    url: '/api/user-profile/to-telegram',
    method: 'post',
    data: formData,
  });
};
