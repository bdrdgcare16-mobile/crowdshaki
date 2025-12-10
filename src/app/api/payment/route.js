import { NextResponse } from "next/server";

export async function POST(req) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }

    try {
        const data = await req.json();
        const { amount, buyer_name, buyer_email, buyer_phone } = data;

        // Replace with your own InstaMojo API key and Auth token
        const api_key = 'aeba92e7fb23d0dcd04e59d4843f391c'; 
        const auth_token = '171fa897cd458790dfc9594b3067ec86';

        const response = await fetch('https://test.instamojo.com/api/1.1/payment-requests/', {
            method: 'POST',
            headers: {
                "X-Api-Key": api_key,
                "X-Auth-Token": auth_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                purpose: "Donation",
                amount,
                buyer_name,
                email: buyer_email,
                phone: buyer_phone,
                redirect_url: "https://crowdshaki.vercel.app/success" // Replace with your success URL
            })
        });

        if (!response.ok) {
            throw new Error(`InstaMojo API error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return NextResponse.json({ payment_url: responseData.payment_request.longurl });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
    }
}