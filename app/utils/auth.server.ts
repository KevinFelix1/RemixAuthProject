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

import { SessionStorage, redirect, json, TypedResponse} from "@remix-run/node";
import { sessionStorage } from "./session.server";
import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";

class AuthEstrategy {
    private session: SessionStorage;

    constructor(session: SessionStorage) {
        this.session = session;
    }

    async authenticate(
        request: Request,
        options: AuthRedirectOptions
    ): Promise<TypedResponse> {
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
        //set token in the session
        const {name, lastname} = user;
        const token = await `Bearer ${jwt.sign({email, name, lastname}, process.env.SECRETKEY as string, {expiresIn: "1h"})}`;
        session.set("authToken", token);
        if(typeof options.successRedirect !== 'string') {
            throw new Response("No existe redireccion", {status: 404})
        }
        return redirect(options.successRedirect, {
            headers: {
            "Set-Cookie": await this.session.commitSession(session),
            },
        });

    };

    async register(
        request: Request,
        options: AuthRedirectOptions
    ):Promise<any> {
        const session = await this.session.getSession(
            request.headers.get("Cookie")
        );
        const form = await request.formData();
        const name = form.get("name") as string;
        const lastname = form.get("lastname") as string;
        const email = form.get("email") as string;
        const password = await bcrypt.hash(form.get("password") as string, 10);

        if(!name || !lastname || !email || !password) {
            session.flash('error', "empty fields left");
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

        const response = await axios.post("http://localhost:4000/users", {
            name,
            lastname,
            email,
            password
        }).then(response => response.data);

        if(!response) {
            session.flash('error', "Ups! something error");
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
        if(typeof options.successRedirect !== 'string') throw new Response("no existe redireccion", {status: 404});
        return redirect(options.successRedirect);
    };
};

const  Authenticator = new AuthEstrategy(sessionStorage);
export default Authenticator;