import type { MetaFunction,  ActionFunctionArgs,  LoaderFunctionArgs } from "@remix-run/node";
// import { redirect } from "@remix-run/node";
// import axios from "axios";
// import jwt from "jsonwebtoken";
import { getSession, commitSession} from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App Auth" },
    { name: "description", content: "Welcome to my Project Remix Auth!" },
  ];
};

export const loader = async({request}: LoaderFunctionArgs) => {
  return null
}

// export const action = async ({request}: ActionFunctionArgs) => {
//   const session = await getSession(
//     request.headers.get("Cookie")
//   );
//   const form = await request.formData();
//   const email = form.get("email");
//   const password = form.get("password");

//   const user = await axios.get(`http://localhost:4000/users?email=${email}`);

//   if (user == null) {
//     session.flash("error", "Invalid username/password");

//     // Redirect back to the login page with errors.
//     return redirect("/", {
//       headers: {
//         "Set-Cookie": await commitSession(session),
//       },
//     });
//   };

//   const token = await jwt.sign(user, process.env.SECRETKEY as string, {expiresIn: "1h"});
//   console.log(token);
//   return '';
// }

export default function Index() {
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
          <button className="submit" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
