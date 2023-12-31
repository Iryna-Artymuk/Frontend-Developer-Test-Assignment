import { create } from 'zustand';
import axios from '@/utils/axios';

const useUsersStore = create((set, get) => ({
  loading: false,
  error: {},
  total_pages: 0,
  positions: [],

  getUsers: async (page, count) => {
    try {
      set(() => {
        return {
          loading: true,
        };
      });

      const response = await axios.get(`/users?page=${page}&count=${count}`);
      if (response.status === 200) {
        set(() => {
          return {
            loading: false,
            total_pages: response.data.total_pages,
          };
        });
        return response;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      set(() => {
        return {
          error: error,
        };
      });
      throw new Error(error);
    }
  },
  getPositions: async () => {
    try {
      const response = await axios.get(`/positions`);
      if (response.status === 200) {
        set(() => {
          return {
            positions: response.data.positions,
            loading: false,
          };
        });
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      set(() => {
        return {
          error: error,
        };
      });
      throw new Error(error);
    }
  },

  // getOnePost: async id => {
  //   try {
  //     set(() => {
  //       return {
  //         loading: true,
  //       };
  //     });
  //     const response = await axios.get(`/news/${id}`);
  //     set(() => {
  //       return {
  //         post: response.data,
  //       };
  //     });
  //     set(() => {
  //       return {
  //         loading: false,
  //       };
  //     });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // },

  // addPost: async data => {
  //   if (isDataValid(data)) {
  //     try {
  //       set(() => {
  //         return {
  //           loading: true,
  //         };
  //       });
  //       const response = await axios.post('/news', data, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //       set(() => {
  //         return {
  //           loading: false,
  //         };
  //       });
  //       return response;
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   }
  // },

  // editPost: async (id, data) => {
  //   if (isDataValid(data)) {
  //     try {
  //       set(() => {
  //         return {
  //           loading: true,
  //         };
  //       });
  //       const response = await axios.patch(`/news/${id}`, data, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //       set(() => {
  //         return {
  //           loading: false,
  //         };
  //       });
  //       return response;
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   }
  // },

  // deletePost: async id => {
  //   if (id) {
  //     try {
  //       set(() => {
  //         return {
  //           loading: true,
  //         };
  //       });
  //       const response = await axios.delete(`/news/${id}`);
  //       set(() => {
  //         return {
  //           news: get().news.filter(post => post.id !== id),
  //         };
  //       });
  //       set(() => {
  //         return {
  //           loading: false,
  //         };
  //       });
  //       return response;
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   }
  // },
}));

export default useUsersStore;
