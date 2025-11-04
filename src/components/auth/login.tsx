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
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const Login = () => {
  const { setAuth } = useAuthState();

  const [isLoading, SetIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', passowrd: '' },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { email, passowrd } = values;

    SetIsLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, passowrd);
      navigate('/');
    } catch (error) {
      const result = error as Error;
      setError(result.message);
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col space-y-4'>
      {error && (
        <Alert variant='destructive' className='mb-4'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Xato!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>

          {/* Email input */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className='h-12 rounded-full border border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 text-base px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                    placeholder='Email kiriting'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-400 px-4' />
              </FormItem>
            )}
          />

          {/* Password input */}
          <FormField
            control={form.control}
            name='passowrd'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className='h-12 rounded-full border border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 text-base px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                    placeholder='Parol kiriting'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-400 px-4' />
              </FormItem>
            )}
          />

          {/* Remember me */}
          <div className='flex items-center space-x-2 px-4'>
            <span className='w-3 h-3 rounded-full bg-blue-600 block'></span>
            <p className='text-sm text-gray-300'>Menga bildirish</p>
          </div>

          {/* Submit button */}
          <div>
            <Button
              type='submit'
              className='h-12 w-full mt-6 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 text-white'
              disabled={isLoading}
              style={{
                background: 'linear-gradient(90deg, #0072ff, #00c6ff)',
                border: 'none',
              }}
            >
              {isLoading ? 'Yuklanmoqda...' : 'Kirish'}
            </Button>
          </div>

          {/* Register link */}
          <div className='pt-2 text-center'>
            <button
              type='button'
              className='text-sm text-blue-400 hover:text-blue-300 transition-colors'
              onClick={() => setAuth('register')}
            >
              Akkountingiz yo‘qmi? Ro‘yxatdan o‘ting.
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
