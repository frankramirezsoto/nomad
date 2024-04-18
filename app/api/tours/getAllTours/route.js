import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const prisma = new PrismaClient();
    try {
        // Fetch all businesses and include related images and types
        const tours = await prisma.tour.findMany({
            include: {
                Images: true,
                Review: true,
            },
        });
        await prisma.$disconnect();

        return NextResponse.json({data: tours}, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: 'Failed to fetch tours'}, { status: 500 });
    }
}
