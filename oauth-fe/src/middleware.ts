import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// const publicRoutes = ["/", "/login"];
const protectedRoutes = ["/home"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // protected routes이고
  if (isProtectedRoute) {
    // 액세스 토큰이 없을때
    if (!accessToken) {
      // 리프레쉬 토큰도 없다면 로그인 페이지로 리다이렉트
      if (!refreshToken) {
        return NextResponse.redirect(
          new URL(`/login?redirectedURL=${path}`, req.nextUrl)
        );
      }
      // 리프레쉬 토큰이 있다면 재발급 요청
      else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              cookie: `refresh_token=${refreshToken}`,
            },
          }
        );

        if (res.ok) {
          // 토큰을 json으로 받아서 쿠키 저장소에 set
          const { data: accessToken } = await res.json();

          const cookieResponse = NextResponse.next();

          cookieResponse.cookies.set("access_token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 1000 * 60,
          });

          return cookieResponse;
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
