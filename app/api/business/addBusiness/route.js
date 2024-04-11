
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const request = await req.json()
  
        // Create a new business entry in the database
        const newBusiness = await prisma.business.create({
          data: request,
        });
        await prisma.$disconnect();
        // Send the created business as a response
        return NextResponse.json({data: newBusiness}, { status: 200 })
      } catch (error) {
        console.error('Failed to add new business:', error);
        return NextResponse.json({error: 'Failed to add new business'}, { status: 500 }) 
      }
}
