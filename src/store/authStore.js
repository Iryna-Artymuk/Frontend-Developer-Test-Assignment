import { create } from 'zustand';
import axios from '@/utils/axios';

const useAuthStore = create(set => ({
  authLoading: false,
  isNewUserRegister: false,
  token: '',
  error: null,

  getToken: async () => {
    try {
      set(() => {
        return {
          authLoading: true,
        };
      });
      await axios
        .get(`/token `)
        .then(response => {
          const token = response.data.token;
          if (token) {
            window.localStorage.setItem('access_token', token);
          }
          set(() => {
            return {
              authLoading: false,
              token: token,
            };
          });
        })
        .catch(error => {
          console.error('Fetch error:', error);
          set(() => {
            return {
              error: error,
            };
          });
        });
    } catch (error) {
      console.error(error);
      set(() => {
        return {
          error: error,
        };
      });
    }
  },
  register: async formdata => {
    try {
      await axios
        .post(`/users`, formdata)
        .then(response => {
          console.log('response: ', response);

          if (response.status === 201) {
            set(() => {
              return {
                authLoading: false,
                isNewUserRegister: true,
              };
            });
          }
         
        })
        .catch(error => {
          set(() => {
            return {
              error: error,
            };
          });
        });
    } catch (error) {
      set(() => {
        return {
          error: error,
        };
      });
      console.error(error);
    }
  },
}));

export default useAuthStore;
