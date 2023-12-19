import type {LoaderFunctionArgs} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
// import { isAuthenticated } from "~/utils/auth.server";
import { getSession } from "~/utils/session.server";
export const loader = async({request}: LoaderFunctionArgs) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    if (!session.has("authToken")) {
        // Redirect to the home page if they are already signed in.
        return redirect("/");
    }

    // const user = await isAuthenticated(request);
    return '';

}
export default function Dashboard() {
 const data = useLoaderData();
 console.log(data);
 return(
    <div>
        <p>Hello in dashboardPage protect</p>
        <p>You name is: Undefined</p>
        <p>Email: Undefined</p>
        <button type="button">Logout</button>
    </div>
 )
}