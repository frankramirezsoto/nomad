// pages/api/images/addImage.js
import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function POST(req) {
    const request = await req.json()
    const {business_id, tour_id, image} = request;
    try {
      const newImage = await prisma.images.create({
        data: {
          business_id,
          tour_id,
          image: Buffer.from(image, 'base64'), 
        },
      });
      
      await prisma.$disconnect();
      return NextResponse.json({data: newImage}, { status: 200 })
    } catch (error) {
      console.error('Failed to add image:', error);
      return NextResponse.json({error: 'Failed to add image'}, { status: 401 }) 
    }
}
