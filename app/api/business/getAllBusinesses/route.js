import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Fetch all businesses and include related images and types
        const businesses = await prisma.business.findMany({
            include: {
                Images: true, // Include related images
                BusinessTypes: true, // Include related business types
                Review: true,
            },
        });
        await prisma.$disconnect();

        return NextResponse.json({data: businesses}, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: 'Failed to fetch businesses'}, { status: 500 });
    }
}
