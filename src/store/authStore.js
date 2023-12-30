import { create } from 'zustand';
import axios from '@/utils/axios';

const useAuthStore = create(set => ({
  loading: false,
  isAuthorized: false,
  token: '',

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
              authLoadin: false,
              isAuthorized: true,
              token: token,
            };
          });
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    } catch (error) {
      console.error(error);
    }
  },
  register: async (formdata) => {
    try {
      await axios
        .post(`/users`, formdata,)
        .then(response => {
          console.log('response : ', response );
          set(() => {
            return {
              authLoadin: false,
            };
          });
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useAuthStore;
