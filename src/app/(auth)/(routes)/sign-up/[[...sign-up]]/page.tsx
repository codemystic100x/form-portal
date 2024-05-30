import MaxWidthWrapper from '@/components/max-width-wrapper';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='p-12'>
      <SignUp />
    </div>
  );
}
