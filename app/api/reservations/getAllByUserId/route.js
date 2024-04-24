import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function GET(req) {
    //Gets the id by the searchParams
    const searchParams = new URL(req.url).searchParams;
    const user_id = searchParams.get('user_id');

  try {
    // Fetch itinerary by user_id including related Tour
    const reservations = await prisma.reservation.findMany({
      where: {
        user_id: parseInt(user_id), // Ensure the ID is an integer
      },
      include: {
        Tour: {
            select: {
                tour_id: true,
                name: true,
                canton: true,
                province: true,
                Images: {
                    take: 1,
                    select: {
                        image: true
                    }
                },
            },
        }
      },
    });


    return NextResponse.json({data: reservations}, { status: 200 })
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch businesses'}, { status: 500 }) 
  }
}
