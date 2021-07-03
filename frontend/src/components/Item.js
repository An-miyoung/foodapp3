import React from "react";
import { axiosInstance } from "api";
import { Button, Card, Form , InputNumber } from "antd";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useAppContext } from "store";


export default function Item({item}) {
    const { store: {jwtToken}} = useAppContext();
    const { id, shop, name, photo, price } = item;
    const { id:shopId } = shop ;

    const [keyboard, setKeyboard] = React.useState(true);
    const history = useHistory();
    const apiUrl = `/api/shops/${shopId}/items/${id}/order/`;

    const onFinish = (values) => {
        async function fn() {
            const headers = { Authorization: `JWT ${jwtToken}` };

            const { quantity } = values;
            const data = { quantity };

            const formData = new FormData();
            formData.append("quantity", quantity);

            try {
                const response = await axiosInstance.post(`/api/shops/${shopId}/items/${id}/order/`, formData, {headers});  
            }
            catch(error) {
                console.log(error)
            }
        }
        fn();
        
   }

    return (
        <>
        <Card hoverable
            title={name}
            style = {{width:"250px", marginBottom: "1rem"}}
            cover={<img src={photo} alt={name} />}
            actions={[
                <Form onFinish={onFinish} autoComplete={"false"}>
                    <Form.Item 
                        label="주문수량"
                        name="quantity"
                        style = {{marginLeft: "1rem"}}
                    >
                       <InputNumber min={1} max={10} keyboard={keyboard} defaultValue={1} />  
                    </Form.Item>
                    
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" >주문하기</Button>               
                    </Form.Item>
                </Form>  
            ]}
        >
            <Card.Meta 
                description={`가격: ${price}원`}
            />  
        </Card>  
        <Link to={{ pathname: "/menu/order", state: { shop_id: shopId, item_id: id }}}>
                        주문서보기
        </Link>          
    </>
    );
    
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};