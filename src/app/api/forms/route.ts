import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, walletAddress, contributionReview } = body;

    if (!userId) {
      return NextResponse.json('Unauthorized', { status: 403 });
    }

    if (!name) {
      return NextResponse.json('Form Name not available', { status: 400 });
    }
    if (!walletAddress) {
      return NextResponse.json('Form Wallet Address not available', {
        status: 400,
      });
    }
    if (!contributionReview) {
      return NextResponse.json('Form Contrbution not available', {
        status: 400,
      });
    }

    const form = await prismadb.form.create({
      data: {
        userId,
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

export async function GET(req: Request, res: Response) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json('Unauthorized', { status: 403 });
    }

    const forms = await prismadb.form.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(forms, { status: 200 });
  } catch (error) {
    console.log('[FORMS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
