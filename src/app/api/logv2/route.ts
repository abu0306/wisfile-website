import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const params = await request.json();
  const url = process.env.LOGGER_POST_URL || "";
  if (!url) {
    console.error("Logger server URL or token is not set");
    return NextResponse.json({ message: "OK" });
  }

  try {
    const headersObject = Object.fromEntries(request.headers.entries());
    delete headersObject["content-length"];
    delete headersObject["content-type"];
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...headersObject,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      return response;
    }
    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({
      message: "failed",
      error: {
        message: `${error}`,
        status: 500,
      },
      data: null,
      success: false,
    });
  }
}
