import { NextRequest, NextResponse } from "next/server";

// API endpoint for file renaming service
const API_ENDPOINT =
  "http://wisfile-api.prod.atominnolab.com/v1/api/file/rename";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    if (!requestData.old_name || !requestData.content) {
      return NextResponse.json(
        { error: "Missing required fields: old_name and content" },
        { status: 400 }
      );
    }
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "allow-origin": "*",
      },
      body: JSON.stringify(requestData),
    });

    const responseData = await response.json();
    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        return NextResponse.json(
          { ok: false, data: errorData },
          { status: response.status }
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);
        return NextResponse.json(
          { ok: false, message: errorText },
          { status: response.status }
        );
      }
    }
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error request:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to process rename request" },
      { status: 500 }
    );
  }
}
