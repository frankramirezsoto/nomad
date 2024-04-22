import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from "next/server";

export async function POST(req, res) {

  const request = await req.json();

  try {
    const { email, password, first_name, last_name } = request;

    //Check if user already exists
    const existingUser = await prisma.businessUser.findUnique({
      where: { email },
    });
    console.log(existingUser);
    if (existingUser) {
      return NextResponse.json(
        { message: "It looks like you already have account. Login now!" },
        { status: 409 }
      );
    }
    console.log(existingUser);
    // Create user
    const user = await prisma.businessUser.create({
      data: {
        b_user_id:0,
        email,
        password,
        first_name,
        last_name,
      },
    });

    await prisma.$disconnect();
    // Respond with the created user (omit sensitive information)
    const { password: _, ...userInfo } = user;
    return NextResponse.json({ data: userInfo }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong"},{status:500});
  }
}
