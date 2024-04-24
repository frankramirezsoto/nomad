import prisma from '../../prismaClient/prismaClient';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
    //Gets the id by the searchParams
    const searchParams = new URL(req.url).searchParams;
    const userId = searchParams.get('user_id');

    try {
        // Delete all itineraries for the specified user
        const deleteResult = await prisma.itinerary.deleteMany({
            where: {
                user_id: parseInt(userId),
            },
        });

        // If successful, return a success response
        if (deleteResult.count > 0) {
            return NextResponse.json({ message: 'Itineraries cleared successfully', deletedCount: deleteResult.count }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'No itineraries found for the user', deletedCount: deleteResult.count }, { status: 404 });
        }
    } catch (error) {
        console.error('Failed to clear itineraries:', error);
        // If deletion fails, return an error response
        return NextResponse.json({ error: 'Failed to clear itineraries' }, { status: 500 });
    }
}
