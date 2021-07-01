import React from "react";
import { Route } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "./Home";
import AccountsRoutes from "./accounts";
// import LoginRequiredRoute from "utils/LoginRequiredRoute";

export default function Root() {
    return (
        <AppLayout>
            {/* 사용자의 주소에 따른 가게리스트를 보여주고 싶다면 LoginRequiredRoute를 Route대신 씀 */}
            <Route exact path="/" component={Home}/>
            {/* 주문내역을 모달로 뿌린다면 삭제할것 */}
            <Route path="/accounts" component={AccountsRoutes}/>
        </AppLayout>
    )
}