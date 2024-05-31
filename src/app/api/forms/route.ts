import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, walletAddress, contributionReview } = body;

    if (!userId) {
      return NextResponse.json('Unauthorized', { status: 403 });
    }

    if (!name || !walletAddress || !contributionReview) {
      return NextResponse.json(
        {
          error:
            'All fields (name, walletAddress, contributionReview) are required',
        },
        { status: 400 }
      );
    }

    // Get the current user information from Clerk
    const user = await currentUser();
    const clerkId = userId;
    const email = user?.primaryEmailAddress?.emailAddress || '';

    // Ensure the user exists in the database
    let dbUser = await prismadb.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) {
      dbUser = await prismadb.user.create({
        data: {
          clerkId,
          email,
          name: user?.firstName || '',
        },
      });
    }

    const form = await prismadb.form.create({
      data: {
        userId: dbUser.id,
        name,
        walletAddress,
        contributionReview,
      },
    });

    return NextResponse.json(form, { status: 200 });
  } catch (error) {
    console.log('[FORMS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

// export async function GET(req: Request) {
//   try {
//     // const user = await currentUser();

//     const user = await prismadb.user.findFirst({});

//     const { userId: clerkUser } = auth();

//     if (!clerkUser) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
//     }

//     const forms = await prismadb.form.findMany({
//       where: {
//         userId: user?.id,
//       },
//     });

//     if (forms.length === 0) {
//       return NextResponse.json({ error: 'No forms found' }, { status: 404 });
//     }

//     return NextResponse.json(forms, { status: 200 });
//   } catch (error) {
//     console.error('[FORMS_GET]', error);
//     return new NextResponse('Internal error', { status: 500 });
//   }
// }

export async function GET(req: Request) {
  try {
    const { userId: clerkUserId } = auth();

    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Find the user in your database by their Clerk user ID
    const user = await prismadb.user.findUnique({
      where: { clerkId: clerkUserId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch the forms associated with the authenticated user
    const forms = await prismadb.form.findMany({
      where: { userId: user.id },
    });

    if (forms.length === 0) {
      return NextResponse.json({ error: 'No forms found' }, { status: 404 });
    }

    return NextResponse.json(forms, { status: 200 });
  } catch (error) {
    console.error('[FORMS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
