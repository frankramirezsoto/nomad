// pages/api/tour/deleteBusiness.js

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req) {
  const { tour_id } = await req.json();

  try {
    // Delete the tour and its associated data
    await prisma.tour.delete({
      where: {
        tour_id: parseInt(tour_id), // Ensure the ID is an integer
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({ message: 'Tour deleted successfully' }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to delete tour' }, { status: 500 });
  }
}
