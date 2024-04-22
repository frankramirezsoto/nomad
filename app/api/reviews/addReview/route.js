import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const request = await req.json(); // Parse the JSON body from the request
    console.log(request);
    debugger;
    // Create a new review entry in the database
    const newReview = await prisma.review.create({
      data: {
        user_id: parseInt(request.user_id),
        rating: parseInt(request.rating),
        comment: request.comment,
        business_id: parseInt(request.business_id), // Will be undefined if not provided, which is handled by Prisma
        tour_id: parseInt(request.tour_id), // Will be undefined if not provided, which is handled by Prisma
      }
    });
    await prisma.$disconnect();
    // Send the created review as a response
    return NextResponse.json({data: newReview}, { status: 200 });
  } catch (error) {
    console.error('Failed to add new review:', error);
    // Handle any errors that occur during the fetch
    return NextResponse.json({error: 'Failed to add new review'}, { status: 500 });
  }
}
