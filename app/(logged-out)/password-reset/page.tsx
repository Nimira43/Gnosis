'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email()
})

export default function PasswordReset() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {

  }

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle className='uppercase'>
            Password Reset
          </CardTitle>
          <CardDescription>
            Enter your email address to reset your password.
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
                  {!!form.formState.errors.root?.message && (
                    <FormMessage>
                      {form.formState.errors.root.message}
                    </FormMessage>
                  )}
                  <Button 
                    className='uppercase'
                    type='submit'
                  >
                    Submit
                  </Button>
                </fieldset>
              </form>
            </Form>
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <div className='text-muted-foreground text-sm'>
            Remember your password?{' '}
            <Link 
              href='/login' 
              className='text-muted-foreground uppercase'
            > 
              Login     
            </Link>
          </div>
          <div className='text-muted-foreground text-sm'>
            {"Don\'t have an account? "}
            <Link 
              href='/login' 
              className='text-muted-foreground uppercase'
            > 
              Register     
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
    
  )
}
