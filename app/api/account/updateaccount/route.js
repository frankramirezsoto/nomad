// pages/api/business/updateBusiness.js

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req) {
  const request = await req.json();
  const { ...updateData } = request;

  try {
    // Update the account in the database
    const updatedAccount = await prisma.businessUser.update({
      where: {
        b_user_id: parseInt(updateData.b_user_id), // Ensure the ID is an integer
      },
      data: updateData,
    });
    await prisma.$disconnect();

    return NextResponse.json({ data: updatedAccount }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 }
    );
  }
}
