import type { MetaFunction,  ActionFunctionArgs,  LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession, commitSession} from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App Auth" },
    { name: "description", content: "Welcome to my Project Remix Auth!" },
  ];
};

export const loader = async({request}: LoaderFunctionArgs) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const data = { error: session.get("error") };
  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Index() {
  const data = useLoaderData() as any; //errors
  return (
    <div>
      <h1 className="title">Login to RemixAuthProject</h1>
      <div className="box">
        <form className="form" method="POST" action="/">
          <div className="box-input">
            {/* Email */}
            <label htmlFor="email">
              Email
            </label>
            <input name="email" type="email" id="email" placeholder="Enter your email address"/>
          </div>
          <div className="box-input">
            {/* Password */}
            <label htmlFor="password">
              Password
            </label>
            <input name="password" type="password" id="password" placeholder="password account"/>
          </div>
          {data?.error && <div className="alert">{data?.error}</div>}
          <button className="submit" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
