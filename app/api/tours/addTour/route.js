
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const prisma = new PrismaClient();
    try {
        const request = await req.json()
        console.log(request);
        if (request.discount_end && request.discount_start) {
          request.discount_start = new Date(request.discount_start).toISOString();
          request.discount_end = new Date(request.discount_end).toISOString();
        } else {
          request.discount_end = null;
          request.discount_start = null;
        }
        request.discount == "" ? request.discount = null : null;
        
        // Create a new business entry in the database
        const newTour = await prisma.tour.create({
          data: request,
        });
        console.log(newTour)
        await prisma.$disconnect();
        // Send the created business as a response
        return NextResponse.json({data: newTour}, { status: 200 })
      } catch (error) {
        console.error('Failed to add new tour:', error);
        return NextResponse.json({error: 'Failed to add new tour'}, { status: 500 }) 
      }
}
