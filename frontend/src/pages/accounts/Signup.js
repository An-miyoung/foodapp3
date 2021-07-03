import React, { useState } from "react";
import { axiosInstance} from "api";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

export default function Signup() {
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = (values) => {

        async function fn() {
            const { username, password } = values;
            setFieldErrors({});
            const data = { username, password };
            try {
                const response = await axiosInstance.post("/accounts/signup/", data);
            
                notification.open({
                    message: "회원가입을 축하합니다.",
                    description: "로그인페이지로 이동합니다",
                    icon: <SmileOutlined style={{ color: "#108ee9"}}/>
                })
                history.push("/accounts/login");
            }
            catch(error) {
                if (error.response) {
                    notification.open({
                        message: "회원가입에 실패했습니다.",
                        description: "아이디, 비밀번호를 확인해주세요",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />
                    })
                    const { data: fieldsErrorMessages } = error.response;
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce((acc, [fieldName, errors]) => {
                            acc[fieldName] = {
                                // 아래 2개 필드는 antd가 정의한 필드
                                validateStatus: "error",
                                help : errors.join(" "),
                            }
                            return acc;
                        },{})
                    );
                }
            }
        }
        fn();
    }


    return (
        <Card title="회원가입"
              hoverable
              style = {{width:"250px", height:"342px",marginBottom: "1rem"}}
        >
           <Form
                {...layout}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="아이디"
                    name="username"
                    rules={[{ required: true, message: '영문 4글자이상 입력해주세요' },
                            {min: 4, message: '영문 4글자이상 입력해주세요'}
                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[{ required: true, message: '영문+숫자 5글자이상 입력해주세요' },
                            {min: 4, message: '영문+숫자 5글자이상 입력해주세요' }
                    ]}
                    {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    가입하기
                    </Button>
                </Form.Item>
            </Form>          
            
        </Card>
    );
    
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};