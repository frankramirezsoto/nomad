// pages/api/business/deleteBusiness.js

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req) {
  const { business_id } = await req.json();
    console.log(business_id)
  try {
    // Delete the business and its associated data
    await prisma.business.delete({
      where: {
        business_id: parseInt(business_id), // Ensure the ID is an integer
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({ message: 'Business deleted successfully' }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to delete business' }, { status: 500 });
  }
}
