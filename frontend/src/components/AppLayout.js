import React from "react";
import "./AppLayout.scss";
import { Input, Menu } from 'antd';
import LogoImage from "assets/logo_sikinda.png";
import { Link } from "react-router-dom";


export default function AppLayout({ children }) {
    return (    
        <div className="app">
            <div className="header">
                <h5 className="logo">
                    <img src={LogoImage} alt="logo" style={{alignSelf: "center"}} />
                </h5>
                <div className="serach">
                    <Input.Search style={{ verticalAlign: 'middle' }} placeholder="음식명, 가게명으로 검색"/>
                </div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item>
                            <Link to={{ pathname: "/accounts/signup"}}>회원가입</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={{ pathname: "/accounts/login"}}>로그인</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="contents">
                {children}
            </div>
            <div className="footer">
                &copy; 2021. 배달 "시킨다"
            </div> 
        </div>
        
    );
}
