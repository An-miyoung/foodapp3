import React from "react";
import { Route } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "./Home";
import AccountsRoutes from "./accounts";

export default function Root() {
    return (
        <AppLayout>
            <Route path='/' component={Home}/>
            {/* 주문내역을 모달로 뿌린다면 삭제할것 */}
            <Route exact path='/accounts' component={AccountsRoutes}/>
        </AppLayout>
    )
}