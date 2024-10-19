'use client'

import { Button } from '@/components/ui/button'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { passwordMatchSchema } from '@/validation/passwordMatchSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
}).and(passwordMatchSchema)

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {

  }

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register for a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(handleSubmit)}
              className='flex flex-col gap-2'
            >
              <FormField 
                control={form.control} 
                name='email' 
                render={({field}) => (
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
                render={({field}) => (
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
              <FormField 
                control={form.control} 
                name='passwordConfirm' 
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Password Confirm
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type='password' />                    
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Register</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}