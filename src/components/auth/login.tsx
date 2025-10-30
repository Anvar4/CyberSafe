import { auth } from '@/firebase';
import { loginSchema } from '@/lib/validation';
import { useAuthState } from '@/stores/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

const Login = () => {
 const { setAuth } = useAuthState()

 const [isLoading, SetIsLoading] = useState(false)
 const [error, setError] = useState('')

 const navigate = useNavigate()
 const form = useForm<z.infer<typeof loginSchema>>({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: '', passowrd: '' },
 })

 const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { email, passowrd } = values

    SetIsLoading(true)

    try {
     const response = await signInWithEmailAndPassword(auth, email, passowrd)
     navigate('/')
    } catch (error) {
     const result = error as Error
     setError(result.message)
    } finally {
     SetIsLoading(false)
    }
 }

 return (
  <div className='flex flex-col'>
    <h2 className='text-xl font-bold'>Kirish</h2>
    <p className='text-muted-foreground'>
     Hisobingiz yo'qmi?{' '}
     <span
      className='text-blue-500 cursor-pointer hover:underline'
      onClick={() => setAuth('register')}
     >
      Ro'yxatdan o'tish
     </span>
    </p>
   <Separator className='my-3' />
   {error && (
        <Alert variant='destructive'>
         <AlertCircle className='h-4 w-4' />
         <AlertTitle>Xato!</AlertTitle>
         <AlertDescription>
            {error}
         </AlertDescription>
        </Alert>
   )}
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
     <FormField
      control={form.control}
      name='email'
      render={({ field }) => (
       <FormItem>
    <FormLabel>Elektron pochta</FormLabel>
        <FormControl>
         <Input placeholder='misol@gmail.com' {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <FormField
      control={form.control}
      name='passowrd'
      render={({ field }) => (
       <FormItem>
    <FormLabel>Parol</FormLabel>
        <FormControl>
         <Input placeholder='*****' type='password' {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <div>
    <Button type='submit' className='h-12 w-full mt-2'>
     Kirish
    </Button>
     </div>
    </form>
   </Form>
  </div>
 )
}

export default Login