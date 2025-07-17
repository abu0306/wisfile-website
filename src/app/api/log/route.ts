import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const params = await request.json();

  const url = process.env.LOGGER_POST_URL || "";
  const token = process.env.LOGGER_TOKEN || "";
  if (!url || !token) {
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
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        channel: params.channel || "",
        event_name: params.event_name || "",
        session_id: params.session_id || "",
        user_id: params.user_id || "",
        product: "wisfile",
        time_stamp: new Date().toISOString(),
        props: {
          ...params,
        },
      }),
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
