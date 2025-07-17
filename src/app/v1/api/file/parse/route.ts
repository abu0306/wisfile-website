import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("multipart/form-data")) {
    return new Response(
      JSON.stringify({ error: "Expected multipart form data" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const formData = await request.formData();
  try {
    const response = await fetch(
      "http://wisfile-api.prod.atominnolab.com/v1/api/file/parse",
      {
        method: "POST",
        headers: {
          "allow-origin": "*",
        },
        body: formData,
      }
    );
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

    const apiResponse = await response.json();
    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error("Error request to API server:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to process rename request" },
      { status: 500 }
    );
  }
}
