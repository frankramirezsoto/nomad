import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  const { itinerary_id } = await req.json();

  try {
    // Delete the business and its associated data
    await prisma.itinerary.delete({
      where: {
        itinerary_id: parseInt(itinerary_id), // Ensure the ID is an integer
      },
    });

    return NextResponse.json({ message: 'Itinerary deleted successfully' }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to delete itinerary' }, { status: 500 });
  }
}
