import prisma from "../../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        // Fetch all businesses and include related images and types
        const businesses = await prisma.business.findMany({
            include: {
                Images: {
                    take: 1 
                }, 
                BusinessTypes: true,
                Review: true,
            },
        });

        return NextResponse.json({data: businesses}, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Failed to fetch businesses'}, { status: 500 });
    }
}
