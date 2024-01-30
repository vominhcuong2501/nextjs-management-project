import { yupResolver } from '@hookform/resolvers/yup'
import type { DefaultValues, FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type * as Yup from 'yup'

export const useCreateFormInstance = <T extends FieldValues>(
  schema: Yup.AnyObjectSchema,
  options: {
    mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'all'
    defaultValues?: T
  } = {}
) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    clearErrors,
    unregister,
    watch,
    trigger,
    getValues,
    formState: { errors, isDirty, isValid }
  } = useForm<T>({
    ...options,
    resolver: yupResolver(schema),
    defaultValues: (options.defaultValues as DefaultValues<T>) || {}
  })

  const submit = (value: unknown) => value

  return {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    watch,
    clearErrors,
    getValues,
    unregister,
    submit,
    errors,
    isDirty,
    isValid,
    trigger
  }
}
