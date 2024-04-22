import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function GET(req) {
    //Gets the id by the searchParams
    const searchParams = new URL(req.url).searchParams;
    const b_user_id = searchParams.get('b_user_id');

  try {
    // Fetch businesses by b_user_id including related images
    const businesses = await prisma.business.findMany({
      where: {
        b_user_id: parseInt(b_user_id), // Ensure the ID is an integer
      },
      include: {
        Images: true, // Include related images
      },
    });
    await prisma.$disconnect();

    return NextResponse.json({data: businesses}, { status: 200 })
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch businesses'}, { status: 500 }) 
  }
}

