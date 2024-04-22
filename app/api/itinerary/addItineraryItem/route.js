// pages/api/itinerary.js

import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const request = await req.json();
        console.log(request)

        // Create a new itinerary entry in the database
        const newItinerary = await prisma.itinerary.create({
            data: {
                user_id: request.user_id,
                tour_id: parseInt(request.tour_id),
                tour_datetime: new Date(request.tour_datetime + 'Z'), 
                assistants: parseInt(request.assistants),
            }
        });
        console.log(newItinerary)
        // Send the created itinerary as a response
        return NextResponse.json({data: newItinerary}, { status: 200 });
    } catch (error) {
        console.error('Failed to add new itinerary:', error);
        return NextResponse.json({error: 'Failed to add new itinerary'}, { status: 500 });
    }
}
