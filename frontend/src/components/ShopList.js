import React, { useEffect, useState } from "react";
import Axios from "axios";
import Shop from "./Shop";
import { useAppContext } from "store";

export default function ShopList() {
    const { store: { jwtToken } } = useAppContext();
    
    const apiUrl = "http://localhost:8000/api/shops/";
    const [shopList, setShopList] = useState([]);

    useEffect(() => {
        const headers = { 'Authorization': `JWT ${jwtToken}` };
        Axios.get(apiUrl)
        .then(response => {
            console.log("response: ", response)
            const { data } = response;
            setShopList(data);
        })
        .catch(error => {
            console.log(error)
        }) 
    }, [])
    return(
        <div>
            <h3>현재위차에서 배달가능 식당</h3>
            { shopList && shopList.map((shop) => (
                <Shop shop={shop} key={shop.id} />
            ))}
        </div>
    )
}