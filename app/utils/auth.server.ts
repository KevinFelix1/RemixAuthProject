interface AuthRedirectOptions {
    failureRedirect?: string;
    successRedirect?: string;
};

type User = {
    name: string;
    lastname: string;
    email: string;
    password: string;
};

import { SessionStorage, redirect, json} from "@remix-run/node";
import { sessionStorage } from "./session.server";
import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";
// export async function AuthenticateToken(user: User): Promise<string> {
//     return `Bearer ${jwt.sign(user, process.env.SECRETKEY as string, {expiresIn: "1h"})}`;
// };

// export async function isAuthenticated(request: Request, {succesRedirect, failureRedirect}) {
//     console.log(request);
// }

class AuthEstrategy {
    private session: SessionStorage;

    constructor(session: SessionStorage) {
        this.session = session;
    }

    async authenticate(
        request: Request,
        options: AuthRedirectOptions
    ): Promise<any> {
        const session = await this.session.getSession(
            request.headers.get("Cookie")
        );
        const form = await request.formData();
        const email = form.get("email") as string;
        const password = form.get("password") as string;
        //search in the database of user
        const user: User = await axios.get(`http://localhost:4000/users?email=${email}`).then(response => response.data[0]);
        if (user === undefined) {
            session.flash("error", "User not found");
            // Redirect back to the login page with errors.
            if(typeof options.failureRedirect !== 'string') {
                //Not failureRedirect
                throw new Response("No existe redireccion", {status: 404})
            } else {
                throw redirect(options.failureRedirect, {
                    headers: {
                    "Set-Cookie": await this.session.commitSession(session),
                    },
                });
            };
        };
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            session.flash("error", "Email or password was not correct");
            // Redirect back to the login page with errors.
            if(typeof options.failureRedirect !== 'string') {
                throw new Response("No existe redireccion", {status: 404})
            } else {
                throw redirect(options.failureRedirect, {
                    headers: {
                    "Set-Cookie": await this.session.commitSession(session),
                    },
                });
            };
        };
        return user;
    }
};

export const Authenticator = new AuthEstrategy(sessionStorage);