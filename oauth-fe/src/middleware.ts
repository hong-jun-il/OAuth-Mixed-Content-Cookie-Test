import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token");
  if (!accessToken) {
    return NextResponse.redirect(
      new URL(
        `/session-expired?redirectedFrom=${req.nextUrl.pathname}`,
        req.nextUrl.origin
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home"],
};
