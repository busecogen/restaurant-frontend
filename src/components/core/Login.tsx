import React, {useEffect} from "react";
import {useApi} from "@technarts/react-use-api";
import {useNavigate} from "react-router-dom";
import {RangerContext} from "../../App";

type AuthProp = {
    refresh: string;
    access: string;
};

type UserProp = {
    username: string;
    password: string;
};

export default function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const apiPoster = useApi<AuthProp>({url: "http://localhost:8000/", method: "POST"});
    const {setAuthUser} = React.useContext(RangerContext);


    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user: UserProp = {
            username: username,
            password: password,
        };

        apiPoster.call({
            url: "http://localhost:8000/token/",
            headers: {"Content-Type": "application/json"},
            payload: user,
        });
    };


    useEffect(() => {
        if (apiPoster.RESP) {
            localStorage.setItem("access", apiPoster.RESP.access);
            localStorage.setItem("refresh", apiPoster.RESP.refresh);
            setAuthUser(username);
            navigate("/");
        }
    }, [apiPoster.RESP]);


    return (
        <div className="Auth-form-container w-100" id="login-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content bg-light" id="login-content">
                    <h3 className="Auth-form-title text-center">Login</h3>
                    <div className="form-group ">
                        <label>Username</label>
                        <input
                            className="form-control mt-1"
                            placeholder="Enter username"
                            name="username"
                            type="text"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn" id="classic-button">
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
