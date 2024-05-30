'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  walletAddress: z.string().min(12, {
    message: 'Wallet Address must be atleast 12 characters',
  }),
  contributionReview: z.string().min(20, {
    message: 'Write your contribution to web3 in atleast 20 characters',
  }),
});

export function ProfileForm() {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsIsSubmitting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      walletAddress: '',
      contributionReview: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsIsSubmitting(true);
      const response = await axios.post('/api/forms', data);
      router.push('/thankyou');
      console.log(response);
    } catch (error) {
      console.error('Error in submitting form', error);
      alert('Failed to submit form');
    } finally {
      setIsIsSubmitting(false);
    }
    console.log(data);
  };

  return (
    <Card className='w-[780px]'>
      <CardHeader>
        <CardTitle className='text-3xl'>
          Fill this form for whitelisting your account
        </CardTitle>
        <CardDescription>You have 3 unread messages</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='walletAddress'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your wallet address' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='contributionReview'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your contribution to Web 3</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Write about your contribution to web3'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              onClick={() => {
                toast({
                  title: 'Your Form was Submitted',
                  description:
                    'We will verify your details and conect with you soon !',
                });
              }}
            >
              {isSubmitting ? 'Submitting Form....' : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
