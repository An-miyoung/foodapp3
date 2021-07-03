import React, { useEffect, useState } from "react";
import { axiosInstance } from "api";
import Shop from "./Shop";
import { useAppContext } from "store";

export default function ShopList() {
    const { store: { jwtToken } } = useAppContext();
    
    const apiUrl = "/api/shops/";
    const [shopList, setShopList] = useState([]);

    useEffect(() => {
        const headers = { 'Authorization': `JWT ${jwtToken}` };
        axiosInstance.get(apiUrl)
        .then(response => {
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