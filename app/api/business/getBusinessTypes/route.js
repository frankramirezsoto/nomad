import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const businessTypes = await prisma.businessTypes.findMany();
        await prisma.$disconnect();
        return NextResponse.json({data: businessTypes}, { status: 200 })
      } catch (error) {
          return NextResponse.json({error: 'Failed to fetch business types'}, { status: 500 }) 
      }
}