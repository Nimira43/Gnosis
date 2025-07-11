'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { passwordSchema } from '@/validation/passwordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginWithCredentials } from './actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema
})

export default function Login() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }  
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await loginWithCredentials({
      email: data.email,
      password: data.password
    })
  
    if (response?.error) {
      form.setError('root', {
        message: response.message,
      })
    } else {
      router.push('/my-account')
    }
  }

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <Card className='w-[350px] bg-light-extra'>
        <CardHeader>
          <CardTitle className='uppercase'>
            Login
          </CardTitle>
          <CardDescription>
            Login to your new account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <fieldset
                disabled={form.formState.isSubmitting}
                className='flex flex-col gap-2'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type='email' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type='password' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!!form.formState.errors.root?.message && (
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                )}
                <Button 
                  className='uppercase'
                  type='submit'
                >
                  Login
                </Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <div className='text-muted-foreground text-sm'>
            Do not have an account?{' '}
            <Link
            className='text-muted-foreground uppercase' 
              href='/register'
              >
                Register
              </Link>
          </div>
          <div className='text-muted-foreground text-sm'>
            Forgot password?{' '}
            <Link
              className='text-muted-foreground uppercase' 
              href='/password-reset'
              >
                Reset 
              </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}