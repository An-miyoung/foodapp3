import React from "react";
import {Button} from "antd";
import './Item.scss';

export default function Item({item}) {
    const { id, name, photo, price } = item;
    return (
        <div className="item">
            <div className="name">
                {name}
            </div>
            <div className="action">
                <Button size="small">주문하기</Button>
            </div>
        </div>
    )
}