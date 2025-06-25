'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export default function PasswordReset() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
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
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password
                      </FormLabel>
                      <FormControl>
                        {/* <Input {...field} type='password' /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* {!!form.formState.errors.root?.message && ( */}
                  <FormMessage>
                    {/* {form.formState.errors.root.message} */}
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
    </Card>
  )
}