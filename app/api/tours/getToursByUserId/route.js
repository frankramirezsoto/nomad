import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function GET(req) {
    //Gets the id by the searchParams
    const searchParams = new URL(req.url).searchParams;
    const b_user_id = searchParams.get('b_user_id');

  try {
    // Fetch tours by b_user_id including related images
    const tours = await prisma.tour.findMany({
      where: {
        b_user_id: parseInt(b_user_id), // Ensure the ID is an integer
      },
      include: {
        Images: {
          take: 1,
          select: {
            image: true,
          },
        },
        Reservation: true,
      },
    });
    await prisma.$disconnect();

    return NextResponse.json({data: tours}, { status: 200 })
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch businesses'}, { status: 500 }) 
  }
}