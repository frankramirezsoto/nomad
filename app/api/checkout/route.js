
import prisma from "../prismaClient/prismaClient"
import { NextResponse } from 'next/server';

//Function to calculate discounted price
function calculateDiscountedPrice(price, discountPercent) {
    if (discountPercent < 0 || discountPercent > 100) {
        throw new Error("Invalid discount percentage. Must be between 0 and 100.");
    }
    return price * (1 - (discountPercent / 100));
}

export async function POST(req) {
    try {
        const request = await req.json()
        const reservation = request.reservation;
        const itineraryItems = request.itineraries;
        const reservations = []
        console.log(request)

        //Calculates total, per each item 
        let total = 0;
        itineraryItems.map(itineraryItem => {
            total=0;
            let price_person = 0;
            itineraryItem.Tour.discount
            ? (price_person = calculateDiscountedPrice(
                itineraryItem.Tour.price_person,
                itineraryItem.Tour.discount
                ))
            : (price_person = itineraryItem.Tour.price_person);
            const assistants = itineraryItem.assistants;
            const price = price_person * assistants;

            reservations.push({
                ...reservation, 
                tour_id: itineraryItem.tour_id,
                assistants: itineraryItem.assistants,
                total: price,
                order_datetime: itineraryItem.tour_datetime,
                reservation_datetime: new Date(),
                status: 'sent'
            })
        })
        
        // Create a new business entry in the database
        const newReservations = await prisma.reservation.createMany({
          data: reservations,
        });

        const deleteItineraries = await prisma.itinerary.deleteMany({
            where: {
                user_id: parseInt(reservation.user_id),
            },
        });

        // Send the created business as a response
        return NextResponse.json({data: newReservations}, { status: 200 })
      } catch (error) {
        console.error('Failed to add new reservation:', error);
        return NextResponse.json({error: 'Failed to add new reservations'}, { status: 500 }) 
      }
}
