import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  const request = await req.json()
  try {
    const { email, password } = request;

    // Find the user by email and password
    const user = await prisma.businessUser.findFirst({
      where: {
        email: email,
        password: password, // Assuming plain text comparison for demonstration
      },
    });
    await prisma.$disconnect();
    // If user doesn't exist, return error
    if (!user) {
      return NextResponse.json({error: 'Invalid email or password'}, { status: 401 }) 
    }

    // Omitting sensitive information before sending the user data
    const { password: _, ...userInfo } = user;

    // Send back the user info as JSON
    return NextResponse.json({data: userInfo}, { status: 200 })
  } catch (error) {
    // Handle any errors that occur during the process
    return NextResponse.json({error: 'Internal Server Error'} , { status: 500 })
  }
}
