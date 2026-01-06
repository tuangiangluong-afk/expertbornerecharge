import { NextResponse } from "next/server";
import { sendLeadToDriver } from "@/lib/whatsapp";
import { BookingDetails } from "@/lib/calendar";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            clientName,
            phone,
            pickupLocation,
            dropoffLocation,
            pickupTime,
            distance,
            price
        } = body;

        if (!clientName || !phone || !pickupLocation || !dropoffLocation || !pickupTime) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const booking: BookingDetails = {
            clientName,
            phone,
            pickupLocation,
            dropoffLocation,
            pickupTime: new Date(pickupTime),
            distance,
            price
        };

        // Send to Driver via WhatsApp
        const result = await sendLeadToDriver(booking);

        if (result.success) {
            return NextResponse.json({ success: true });
        } else {
            console.error("WhatsApp Send Failed:", result.error);
            // We still return 200 to frontend if it's just a notification failure 
            // but ideally we should alert admin/logs
            return NextResponse.json({ success: true, warning: "Lead saved but notification failed" });
        }

    } catch (error) {
        console.error("API Lead Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
