import { NextResponse, type NextRequest } from "next/server";
import {
  LANDING_REFERRAL_COOKIE_MAX_AGE,
  LANDING_REFERRAL_COOKIE_NAME,
  getActiveReferralOwner,
  parseReferralUsername,
} from "@/lib/referral";
import { RESERVED_USERNAMES } from "@/lib/username-rules";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-current-pathname", pathname);

  const nextResponse = () =>
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length !== 1) {
    return nextResponse();
  }

  const [candidateSegment] = pathSegments;
  const normalizedCandidate = parseReferralUsername(candidateSegment);

  if (!normalizedCandidate || RESERVED_USERNAMES.has(normalizedCandidate)) {
    return nextResponse();
  }

  const referralOwner = await getActiveReferralOwner(normalizedCandidate);

  if (!referralOwner) {
    return nextResponse();
  }

  const redirectResponse = NextResponse.redirect(new URL("/", request.url), 307);
  redirectResponse.cookies.set(LANDING_REFERRAL_COOKIE_NAME, referralOwner.username, {
    httpOnly: true,
    maxAge: LANDING_REFERRAL_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return redirectResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
