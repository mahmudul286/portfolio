import { NextResponse } from "next/server";

// Required for static export (output: "export") compatibility.
// This route is not used by the portfolio but kept so the build succeeds.
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}