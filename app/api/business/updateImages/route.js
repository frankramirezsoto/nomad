import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req) {
  const { business_id, images } = await req.json();

  try {
    // Delete all existing images associated with the business_id
    await prisma.images.deleteMany({
      where: {
        business_id: parseInt(business_id), // Ensure the ID is an integer
      },
    });

    // Add the new images
    const createdImages = await Promise.all(
      images.map(async (image) => {
        const createdImage = await prisma.images.create({
            data: {
                business_id,
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
