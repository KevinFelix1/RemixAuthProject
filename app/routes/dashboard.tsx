import type {LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
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
export default function Dashboard() {
 const data: any = useLoaderData();
 return(
    <div>
        <p>Hello in dashboardPage protect</p>
        <p>You name is: {data?.name || 'Undefined'} {data?.lastname || 'Undefined'}</p>
        <p>Email: {data?.email || 'Undefined'}</p>
        <button type="button">Logout</button>
    </div>
)}