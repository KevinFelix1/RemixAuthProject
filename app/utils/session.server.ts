// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

type User = {
  name: string;
  lastname: string;
  email: string;
};

type SessionData = {
  authToken: string;
  session?: User;
};

type SessionFlashData = {
  error: string;
};

export const sessionStorage = createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "_session",

        // all of these are optional
        // domain: "remix.run",
        // Expires can also be set (although maxAge overrides it when used in combination).
        // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
        //
        // expires: new Date(Date.now() + 60_000),
        httpOnly: true,
        maxAge: 60,
        path: "/",
        sameSite: "lax",
        secrets: ["s3cret1"],
        secure: process.env.NODE_ENV === "production",
      },
    }
  );

export const { getSession, commitSession, destroySession } = sessionStorage;
