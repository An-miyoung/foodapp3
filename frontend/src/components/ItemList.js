import React, { useEffect, useState } from "react";
import Axios from "axios";
import Item from "./Item";
import { useAppContext } from "store";
import { useLocation } from "react-router";

export default function ItemList() {
    const location = useLocation();
    const init_shop_id = 1;
    const { shop_id } = location.state || init_shop_id;
    

    const { store: { jwtToken }, dispatch } = useAppContext();
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        const headers = { Authorization: `JWT ${jwtToken}` };
        const apiUrl = `http://localhost:8000/api/shops/${shop_id}/items/`;
    
        Axios.get(apiUrl, { headers })
        .then(response => {
            const { data } = response;
            setItemList(data);
        })
        .catch(error => {
            console.log(error)
        })
    },[])
    return (
        <div>
            <h2>주문가능한 메뉴</h2>
            {itemList && itemList.map(item => <Item item={item} key={item.id}/>)}
        </div>
    )
}