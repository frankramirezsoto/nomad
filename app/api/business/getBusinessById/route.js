import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const prisma = new PrismaClient();
  //Gets the id by the searchParams
  const searchParams = new URL(req.url).searchParams;
  const business_id = searchParams.get('business_id');

  try {
    // Fetch business by business_id including related Images and Reviews
    const business = await prisma.business.findUnique({
      where: {
        business_id: parseInt(business_id), 
      },
      include: {
        Images: true, // Include related images
        Review: true, // Include related reviews
      },
    });
    await prisma.$disconnect();
    return NextResponse.json({ data: business }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch business' }, { status: 500 });
  }
}
