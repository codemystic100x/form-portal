import { auth, currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Home() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  if (!userId) {
    redirect('sign-up');
  }

  const user = await currentUser();
  console.log(user?.username);

  return (
    <div>
      <h1>Form</h1>
      {user?.username}
    </div>
  );
}
