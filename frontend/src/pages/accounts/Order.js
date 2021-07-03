import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useAppContext } from "store";
import {useLocation} from "react-router";


export default function Order(props) {
    const location = useLocation();
    console.log("props: ", props);
    const init_shop_id = 1;
    const shop_id = location.state.shop_id || init_shop_id;
    console.log("shop_id: ", shop_id);
    const init_item_id = 1;
    const item_id = location.state.item_id || init_item_id;
    console.log("item_id: ", item_id);

    const apiUrl = `http://localhost:8000/api/shops/${shop_id}/items/${item_id}/order/`
    const { store: { jwtToken } } = useAppContext();
    const [orderList, setOrderList] = useState([]);


    useEffect(() => {
        const headers = { 'Authorization': `JWT ${jwtToken}` };
        Axios.get(apiUrl)
        .then(response => {
            console.log("DB_order_response: ", response)
            const { data } = response;
            setOrderList(data);
        })
        .catch(error => {
            console.log(error)
        }) 
    }, [])
    return (
        <>
        <div>
            <h1>주문해 주셔서 감사합니다.</h1>
            {/* { orderList && orderList.map((order) => (
                <>
                {JSON.stringify(order)}
                </>
            ))} */}
        </div>
        </>
    );
}