import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession, commitSession} from "~/utils/session.server";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "~/styles.css";
import axios from "axios";
import { Authenticate } from "./utils/auth.server";

export const action = async({request}: ActionFunctionArgs) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  
  const user = await axios.get(`http://localhost:4000/users?email=${email}`).then(response => response.data[0]);
  if (user == null) {
    session.flash("error", "Invalid username/password");

    // Redirect back to the login page with errors.
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  };
  const token = await Authenticate(user);
  session.set("userId",token)
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  {rel: "stylesheet", href: styles}
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
