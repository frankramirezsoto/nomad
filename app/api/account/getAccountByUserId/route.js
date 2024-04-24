import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  //Gets the id by the searchParams
  const searchParams = new URL(req.url).searchParams;
  const b_user_id = searchParams.get("b_user_id");

  try {
    // Fetch business by business_id including related Images and Reviews
    const account = await prisma.businessUser.findUnique({
      where: {
        b_user_id: parseInt(b_user_id),
      },
    });
    await prisma.$disconnect();
    console.log(account);
    return NextResponse.json({ data: account }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch account" },
      { status: 500 }
    );
  }
}
