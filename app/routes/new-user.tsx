import type { LoaderFunctionArgs } from "@remix-run/node"
import { Link, useLoaderData} from "@remix-run/react"

export const loader = ({request}: LoaderFunctionArgs) => {
    return '';
}

export default function Register() {
    const data = useLoaderData() as any;
    return (
    <div>
      <h1 className="title">Register to RemixAuthProject</h1>
      <div className="box">
        <form className="form" method="POST" action="/">
        <div className="box-input">
            {/* Email */}
            <label htmlFor="email">
              Name
            </label>
            <input name="lastname" type="text" id="name" placeholder="Enter your name"/>
          </div>
          <div className="box-input">
            {/* Email */}
            <label htmlFor="email">
              Lastname
            </label>
            <input name="lastname" type="text" id="lastname" placeholder="Enter your lastname"/>
          </div>
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
            <input name="password" type="password" id="password" placeholder="New password account"/>
          </div>
          {data?.error && <div className="alert">{data?.error}</div>}
          <button className="submit" type="submit">Register</button>
        </form>
        <div className="answer">
          <p>do you have a account?</p>
          <Link to="/">Login</Link>       
        </div>
      </div>
    </div>
    )
}