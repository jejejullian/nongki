import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const config = {
  matcher: ["/admin/:path*", "/api/cafes/:path*"],
};

export const proxy = auth((request) => {
  const user = request.auth?.user;
  const path = request.nextUrl.pathname;
  const method = request.method;

  const isAdminRoute = path.startsWith("/admin");
  const isProtectedApi = path.startsWith("/api/cafes") && ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  if (isAdminRoute) {
    if (!user || user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (isProtectedApi) {
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Akses ditolak. Membutuhkan izin otorisasi ADMIN." }, { status: 401 });
    }
  }

  return NextResponse.next();
});
