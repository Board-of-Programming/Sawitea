// Better Auth API Routes
// This is a catch-all route that forwards auth requests to the NestJS backend
// In production, you might want to proxy these requests directly

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ all: string[] }> }
) {
  const { all } = await params;
  const path = all.join("/");

  // Forward to NestJS backend
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const url = new URL(request.url);
  const targetUrl = `${apiUrl}/api/auth/${path}${url.search}`;

  const response = await fetch(targetUrl, {
    method: "GET",
    headers: {
      ...Object.fromEntries(request.headers),
      host: new URL(apiUrl).host,
    },
    credentials: "include",
  });

  const data = await response.text();
  return new NextResponse(data, {
    status: response.status,
    headers: response.headers,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ all: string[] }> }
) {
  const { all } = await params;
  const path = all.join("/");

  // Forward to NestJS backend
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const targetUrl = `${apiUrl}/api/auth/${path}`;

  const body = await request.text();
  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      ...Object.fromEntries(request.headers),
      host: new URL(apiUrl).host,
      "content-type": request.headers.get("content-type") || "application/json",
    },
    body,
    credentials: "include",
  });

  const data = await response.text();
  return new NextResponse(data, {
    status: response.status,
    headers: response.headers,
  });
}
