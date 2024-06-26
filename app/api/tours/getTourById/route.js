import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function GET(req) {
  //Gets the id by the searchParams
  const searchParams = new URL(req.url).searchParams;
  const tour_id = searchParams.get('tour_id');

  try {
    // Fetch tour by tour_id including related Images and Reviews
    const tour = await prisma.tour.findUnique({
      where: {
        tour_id: parseInt(tour_id), 
      },
      include: {
        Images: true, 
        Review: {
          include: {
              User: true, 
          },
        }
      },
    });
    await prisma.$disconnect();

    return NextResponse.json({ data: tour }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch business' }, { status: 500 });
  }
}
