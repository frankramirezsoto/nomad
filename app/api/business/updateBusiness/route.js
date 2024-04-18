// pages/api/business/updateBusiness.js

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const prisma = new PrismaClient();
  const request = await req.json();
  const { Images, Review, ...updateData } = request;

  try {
    // Update the business in the database
    const updatedBusiness = await prisma.business.update({
      where: {
        business_id: parseInt(updateData.business_id), // Ensure the ID is an integer
      },
      data: updateData,
    });
    await prisma.$disconnect();

    return NextResponse.json({ data: updatedBusiness }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update business" },
      { status: 500 }
    );
  }
}
