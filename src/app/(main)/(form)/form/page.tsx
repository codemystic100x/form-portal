'use client';
import { ProfileForm } from '@/components/form-component';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import Navbar from '@/components/navbar';
import React from 'react';

const Form = () => {
  return (
    <div>
      <MaxWidthWrapper className='p-12 items-center justify-center'>
        <ProfileForm />
      </MaxWidthWrapper>
    </div>
  );
};

export default Form;
