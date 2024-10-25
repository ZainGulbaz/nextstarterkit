import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { readSiteDomain } from "./utils/actions/sites/read-site-domain";

const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  const url = req.nextUrl;
  const pathname = url.pathname;

  const hostname = req.headers.get("host");

  let currentHost;

  currentHost = hostname?.split(":")[0].replace(".localhost", "");

    if (!currentHost) {
    return NextResponse.next();
  }

  const response = await readSiteDomain(currentHost);

  if (!response || !response.length) {
    return NextResponse.next();
  }

  const site_id = response[0]?.site_id;
  const tenantSubdomain = response[0]?.site_subdomain;

  const rewriteDomain = tenantSubdomain 

  if (rewriteDomain) {
    return NextResponse.rewrite(new URL(`/${site_id}${pathname}`, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
