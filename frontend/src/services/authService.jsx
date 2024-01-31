import { AxiosError } from 'axios';
import { niuxApi } from '../api/niuxApi';

export class AuthService {
  /* Login */

  static login = async (email, password) => {
    try {
      const { data } = await niuxApi.post('/auth/login', {
        email,
        password,
      });
      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data.message);
      }
      console.log(error);
      throw new Error('An error occurred while logging in');
    }
  };

  static socialLogin = async (email, socialId, source) => {
    try {
      const { data } = await niuxApi.post('/auth/social-login', {
        email,
        socialId,
        source,
      });
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  /* Register */

  static socialRegister = async (email, fullName, socialId, source, picture) => {
    try {
      const { data } = await niuxApi.post('/auth/social-register', {
        email,
        fullName,
        socialId,
        source,
        picture,
      });

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  static register = async (email, fullName, password) => {
    try {
      const { data } = await niuxApi.post('/auth/register', {
        email,
        fullName,
        password,
      });
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  /* Status */

  static socialUserAlreadyExists = async (email, socialId, source) => {
    try {
      const { data } = await niuxApi.post('auth/social-user-exists', {
        email,
        socialId,
        source,
      });

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  static checkStatus = async () => {
    try {
      const { data } = await niuxApi.get('/auth/check-status');
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  static getUserById = async (userId) => {
    try {
      const { data } = await niuxApi.get('/auth/find-user/' + userId);
      return data.roles;
    } catch (error) {
      throw error.response.data.message;
    }
  };
}
