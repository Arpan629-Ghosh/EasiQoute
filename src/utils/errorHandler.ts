import axios from 'axios';

export const parseApiError = (error: unknown): string => {
 

  if (axios.isAxiosError(error)) {
   

    const message = error.response?.data?.message;

      if (message) {
      return message;
    }
    if (!error.message) {
      return 'Unable to connect server';
    }
    if (error.code === 'ECONNABORTED') {
      return 'Request timeout';
    }

    return 'Something went wrong';
  }

  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong';
};
