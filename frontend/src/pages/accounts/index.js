import React from "react";
import { Route, match } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Order from "./Order";
// import LoginRequiredRoute from "utils/LoginRequiredRoute"

export default function Routes({match}) {
    return (
        <>
            <Route exact path={match.url + "/signup"} component={Signup} />
            <Route exact path={match.url + "/login"} component={Login} />
            <Route exact path={match.url + "/order"} component={Order} />
        </>
    )
}
