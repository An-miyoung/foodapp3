import React from "react";
import { Route } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "./Home";
import ItemList from "components/ItemList";
import Order from "./accounts/Order";
import AccountsRoutes from "./accounts";
import LoginRequiredRoute from "utils/LoginRequiredRoute";

export default function Root() {
    return (
        <AppLayout>
            {/* 사용자의 주소에 따른 가게리스트를 보여주고 싶다면 LoginRequiredRoute를 Route대신 씀 */}
            <Route exact path="/" component={Home}/>
            <LoginRequiredRoute exact path="/menu" component={ItemList}/>
            <LoginRequiredRoute exact path="/menu/order" component={Order}/>
            <Route path="/accounts" component={AccountsRoutes}/>
        </AppLayout>
    )
}