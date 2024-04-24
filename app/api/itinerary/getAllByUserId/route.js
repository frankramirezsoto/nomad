import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function GET(req) {
    //Gets the id by the searchParams
    const searchParams = new URL(req.url).searchParams;
    const user_id = searchParams.get('user_id');

  try {
    // Fetch itinerary by user_id including related Tour
    const itineraryItems = await prisma.itinerary.findMany({
      where: {
        user_id: parseInt(user_id), // Ensure the ID is an integer
      },
      include: {
        Tour: {
            select: {
                tour_id: true,
                name: true,
                discount: true,
                price_person: true,
                canton: true,
                province: true,
            },
        }
      },
    });


    return NextResponse.json({data: itineraryItems}, { status: 200 })
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch businesses'}, { status: 500 }) 
  }
}
