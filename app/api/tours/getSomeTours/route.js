import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function GET(req) {

    try {
        // Fetch all businesses and include related images and types
        const tours = await prisma.tour.findMany({
            take: 5,
            select: {
                tour_id: true,
                name: true,
                discount: true,
                price_person: true,
                canton: true,
                province: true,
                Images: {
                    take: 1,
                    select: {
                        image: true
                    }
                },
                Review: {
                    select: {
                        rating: true,
                    }
                },
            },
        });

        return NextResponse.json({data: tours}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Failed to fetch tours'}, { status: 500 });
    }
}
