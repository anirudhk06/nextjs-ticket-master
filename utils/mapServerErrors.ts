import { FieldValues, UseFormSetError, Path } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export function mapServerErrors<T extends FieldValues>(
  error: AxiosError | any,
  setError: UseFormSetError<T>,
) {
  if (error instanceof AxiosError && !error.response) {
    if (error.code === 'ERR_NETWORK') {
      toast.error('Network error. Please check your internet connection or try again later.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out. Please try again.');
    } else {
      toast.error('Something went wrong. Please try again later.');
    }
    return;
  }

  const errors = error?.response?.data ?? error;

  if (!errors) return;

  Object.entries(errors).forEach(([key, value]) => {
    if (key === 'non_field_errors' || key === 'detail') {
      toast.error(value as string);
    } else {
      setError(key as Path<T>, {
        type: 'server',
        message: value as string,
      });
    }
  });
}
