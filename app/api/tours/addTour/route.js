
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const request = await req.json()
        request.discount_start = new Date(request.discount_start).toISOString();
        request.discount_end = new Date(request.discount_end).toISOString();
  
        // Create a new business entry in the database
        const newTour = await prisma.tour.create({
          data: request,
        });
        await prisma.$disconnect();
        // Send the created business as a response
        return NextResponse.json({data: newTour}, { status: 200 })
      } catch (error) {
        console.error('Failed to add new business:', error);
        return NextResponse.json({error: 'Failed to add new business'}, { status: 500 }) 
      }
}
