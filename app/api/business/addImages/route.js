// pages/api/images/addImage.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const request = await req.json()
    const {business_id, image} = request;
    try {
      const newImage = await prisma.images.create({
        data: {
          business_id,
          image: Buffer.from(image, 'base64'), 
        },
      });
      return NextResponse.json({data: newImage}, { status: 200 })
    } catch (error) {
      console.error('Failed to add image:', error);
      return NextResponse.json({error: 'Failed to add image'}, { status: 401 }) 
    }
}
