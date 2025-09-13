'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { passwordMatchSchema } from '@/validation/passwordMatchSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { updatePassword } from './actions'
import Link from 'next/link'

const formSchema = passwordMatchSchema

type Props = {
  token: string
}

export default function UpdatePasswordForm({token}: Props) {
  const {toast} = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordConfirm: ''
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await updatePassword({
      token,
      password: data.password,
      passwordConfirm: data.passwordConfirm
    })

    if (response?.tokenInvalid) {
      window.location.reload()
    }

    if (response?.error) {
      form.setError('root', {
        message: response.message
      })
    } else {
      toast({
        title: 'Password Changed',
        description: 'Password has been updated successfully.',
        className: 'bg-green-500 text-white'
      })
      form.reset()
    }
  }

  return (
    form.formState.isSubmitSuccessful ? (
      <div>
        <span>Your password has been updated. </span>
        <Link 
          href='/login'
          className='uppercase'
        >
          Login
        </Link>
      </div>
    ) : (  
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset
            disabled={form.formState.isSubmitting}
            className='flex flex-col gap-2'
          >
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='passwordConfirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!!form.formState.errors.root?.message &&
              <FormMessage>
                {form.formState.errors.root?.message}
              </FormMessage>
            }
            <Button
              className='uppercase'
              type='submit'
            >
              Submit
            </Button>
          </fieldset>
        </form>
      </Form>
    )
  )
}