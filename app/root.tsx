import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, ActionFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { getSession, commitSession} from "~/utils/session.server";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "~/styles.css";
import axios from "axios";
import { Authenticator } from "./utils/auth.server";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
        <Link to="/">Home</Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export const action = async({request}: ActionFunctionArgs) => {
  // const session = await getSession(
  //   request.headers.get("Cookie")
  // );
  // const form = await request.formData();
  // const email = form.get("email");
  // const password = form.get("password");
  
  // const user = await axios.get(`http://localhost:4000/users?email=${email}`).then(response => response.data[0]);

  // if (user === undefined) {
  //   session.flash("error", "User not found");
  //   // Redirect back to the login page with errors.
  //   return redirect('/', {
  //     headers: {
  //       "Set-Cookie": await commitSession(session),
  //     },
  //   });
  // };

  // const token = await AuthenticateToken(user);
  // session.set("authToken",token)
  // return redirect("/dashboard", {
  //   headers: {
  //     "Set-Cookie": await commitSession(session),
  //   },
  // });
  return await Authenticator.authenticate(request, {
    failureRedirect: '/',
    // successRedirect: '/dashboard'
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
