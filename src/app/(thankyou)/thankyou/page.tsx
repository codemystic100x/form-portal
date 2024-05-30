import MaxWidthWrapper from '@/components/max-width-wrapper';
import React from 'react';

const ThankYou = () => {
  return (
    <div className='p-12 flex items-center justify-center'>
      <MaxWidthWrapper>
        <h1 className='text-4xl font-semibold'>
          Thankyou for submitting your Form
        </h1>
        <p className='text-xl font-normal'>
          We will verify your details and connect with you soon.
        </p>
      </MaxWidthWrapper>
    </div>
  );
};

export default ThankYou;
