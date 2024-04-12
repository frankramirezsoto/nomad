import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req) {
  const request = await req.json();
  // Convert discount_start and discount_end to ISO-8601 format if they exist
  request.discount_start ? request.discount_start = new Date(request.discount_start).toISOString() : request.discount_start = null;
  request.discount_end ? request.discount_end = new Date(request.discount_end).toISOString() : request.discount_end = null;
  !request.discount ? request.discount = 0 : null;

  const { Images, Review, ...updateData } = request;

  try {
    // Update the tour in the database
    const updatedTour = await prisma.tour.update({
      where: {
        tour_id: parseInt(updateData.tour_id), // Ensure the ID is an integer
      },
      data: updateData,
    });
    await prisma.$disconnect();

    return NextResponse.json({ data: updatedTour }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update tour" },
      { status: 500 }
    );
  }
}
