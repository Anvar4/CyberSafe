import { auth } from '@/firebase';
import { registerSchema } from '@/lib/validation';
import { useAuthState } from '@/stores/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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

const Register = () => {
  const { setAuth } = useAuthState();

  const [isLoading, SetIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      passowrd: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const { firstName, lastName, email, passowrd } = values;

    SetIsLoading(true);
    setError('');

    try {
      const response = await createUserWithEmailAndPassword(auth, email, passowrd);
      
      // Foydalanuvchi profiliga ism va familiya qo‘shish
      await updateProfile(response.user, {
        displayName: `${firstName} ${lastName}`,
      });

      navigate('/');
    } catch (error) {
      const result = error as Error;
      setError(result.message);
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Xato!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Ism */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12 rounded-full border border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 text-base px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Ismingizni kiriting"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400 px-5" />
              </FormItem>
            )}
          />

          {/* Familiya */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12 rounded-full border border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 text-base px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Familiyangizni kiriting"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400 px-5" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12 rounded-full border border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 text-base px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Email kiriting"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400 px-5" />
              </FormItem>
            )}
          />

          {/* Parol */}
          <FormField
            control={form.control}
            name="passowrd"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12 rounded-full border border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 text-base px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Parol kiriting"
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400 px-5" />
              </FormItem>
            )}
          />

          {/* Parolni tasdiqlash */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12 rounded-full border border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 text-base px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Parolni tasdiqlang"
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400 px-5" />
              </FormItem>
            )}
          />

          {/* Tugma */}
          <div>
            <Button
              type="submit"
              className="h-12 w-full mt-6 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 text-white"
              disabled={isLoading}
              style={{
                background: 'linear-gradient(90deg, #0072ff, #00c6ff)',
                border: 'none',
              }}
            >
              {isLoading ? 'Yuklanmoqda...' : "Ro'yxatdan o'tish"}
            </Button>
          </div>

          {/* Login link */}
          <div className="pt-2 text-center">
            <button
              type="button"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              onClick={() => setAuth('login')}
            >
              Allaqachon hisobingiz bormi? Kirish
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;
