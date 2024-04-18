import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function PUT(req) {
  const prisma = new PrismaClient();
  const { business_id, tour_id, images } = await req.json();

  try {
    if(business_id){
      // Delete all existing images associated with the business_id
      await prisma.images.deleteMany({
        where: {
          business_id: parseInt(business_id), // Ensure the ID is an integer
        },
      });
    } else if(tour_id){
      // Delete all existing images associated with the tour_id
      await prisma.images.deleteMany({
        where: {
          tour_id: parseInt(tour_id), // Ensure the ID is an integer
        },
      });
    }

    // Add the new images
    const createdImages = await Promise.all(
      images.map(async (image) => {
        const createdImage = await prisma.images.create({
            data: {
                business_id,
                tour_id,
                image: Buffer.from(image, 'base64'), 
              },
        });
        return createdImage;
      })
    );

    await prisma.$disconnect();

    return NextResponse.json({ data: createdImages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update business images' }, { status: 500 });
  }
}
