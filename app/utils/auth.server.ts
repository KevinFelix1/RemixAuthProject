type User = {
    name: string;
    lastname: string;
    email: string;
    password: string;
};
import jwt from "jsonwebtoken"

export async function Authenticate(user: User): Promise<string> {
    return `Bearer ${jwt.sign(user, process.env.SECRETKEY as string, {expiresIn: "1h"})}`;
};