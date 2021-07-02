import React from "react";
import { Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import LoginRequiredRoute from "utils/LoginRequiredRoute"

export default function Routes({match}) {
    return (
        <>
            <Route exact path={match.url + "/signup"} component={Signup} />
            <Route exact path={match.url + "/login"} component={Login} />
        </>
    )
}
