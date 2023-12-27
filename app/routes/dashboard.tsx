import type {LoaderFunctionArgs, MetaFunction, ActionFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import Authenticator from "~/utils/auth.server";

export const meta: MetaFunction = () => {
    return [
      { title: "lobby" },
      { name: "description", content: "Welcome to your dashboardPage!" },
    ];
};

export const loader = async({request}: LoaderFunctionArgs) => {
    const user = await Authenticator.isAutenticated(request, {
        failureRedirect: "/",
    });
    return user;
}

export const action = async({request}: ActionFunctionArgs) => {
    return await Authenticator.logout(request);
};

export default function Dashboard() {
 const data: any = useLoaderData();
 return(
    <div>
        <p>Hello in dashboardPage protect</p>
        <p>You name is: {data?.name || 'Undefined'} {data?.lastname || 'Undefined'}</p>
        <p>Email: {data?.email || 'Undefined'}</p>
        <form method="POST">
            <button type="submit">Logout</button>
        </form>
    </div>
)}