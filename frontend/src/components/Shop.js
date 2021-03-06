import React from "react";
import { Button, Card } from "antd";
import { Link } from 'react-router-dom';


export default function Shop({shop}) {
    const { id, name, photo, tel, addr, items } = shop;
    
    return (
        <>
        <Card hoverable
            title={name}
            style = {{width:"250px", marginBottom: "1rem"}}
            cover={<img src={photo} alt={name} style={{height:'200px'}}/>}
            actions={[<Link to={{ pathname: "/menu", state: { shop_id: id }}}>
                        메뉴보기
                    </Link>]}
        >
            <Card.Meta 
                title={tel} 
                description={addr}
            />
        </Card> 
        </>
    );
}