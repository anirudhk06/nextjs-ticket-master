import { useMutation } from '@tanstack/react-query';
import { FieldValues, UseFormSetError } from 'react-hook-form';
import { mapServerErrors } from '@/utils/mapServerErrors';

interface UseMutateOptions<TData, TVariables, TFormValues extends FieldValues> {
  mutationFn: (data: TVariables) => Promise<TData>;
  setError?: UseFormSetError<TFormValues>;
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
}

export function useMutate<
  TData = any,
  TVariables = any,
  TFormValues extends FieldValues = FieldValues,
>({ mutationFn, setError, onSuccess, onError }: UseMutateOptions<TData, TVariables, TFormValues>) {
  return useMutation<TData, any, TVariables>({
    mutationFn,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      if (setError) {
        mapServerErrors<TFormValues>(error, setError);
      }
      onError?.(error);
    },
  });
}
