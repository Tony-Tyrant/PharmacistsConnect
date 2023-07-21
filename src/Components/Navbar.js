import React from "react";
import styled from 'styled-components';
import useIsMobileHook from '../Hooks/useIsMobileHook';
import { Link } from 'react-scroll'

import logo from '../images/logo.png';
import globe from '../images/globe.png';

import { useLang } from "../Contexts/LangContext";

import { colors, metrics } from '../style';

const NavbarWrapper = styled.div`
    height: 140px;
    display: flex;
    justify-content: center;
    box-shadow: 0px 13.44px 22.08px rgba(28, 37, 44, 0.08);
`;
const Wrapper = styled.div`
    max-width: ${metrics.maxWidth};
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    @media (max-width: ${metrics.maxWidth}) {
        justify-content: center;
    }
`;
const Logo = styled.img`
    width: 100px;
`;
const NavLinks = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
`;
const NavItem = styled(Link)`
    padding: 14px 18px;
    color: ${colors.blue};
    font-family: Avenir Next;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
`;
const GlobeIcon = styled.img`
    width: 16px;
    height: 16px;
    margin-left: 4px;
    margin-bottom: 2px;
`;
const GlobeIconMobile = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`;

const MobileLangWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 32px;
    position: absolute;
    right: 0;
    margin: 44px 24px;
`;

const langMap = {
    'search': { 'zh': '尋找你的藥劑師', 'en': 'Find Your Pharmacists' },
    'about': { 'zh': '關於我們', 'en': 'About Us' },
    'join': { 'zh': '加入我們', 'en': 'Join Us' },
    'map-register': { 'zh': '地圖登記', 'en': 'Map Register' },
    'contact': { 'zh': '聯絡我們', 'en': 'Contact Us' },
    'lang': { 'zh': '繁', 'en': 'En' },
}

function Navbar() {
    const isMobile = useIsMobileHook();
    const [lang, setLang] = useLang();

    const handleOnClick = () => {
        setLang(prev => {
            return prev === 'zh' ? 'en' : 'zh';
        });
    }

    return (
        <NavbarWrapper>
            <Wrapper>
                <Logo src={logo} alt="logo" />
                {
                    !isMobile && (
                        <NavLinks>
                            <NavItem offset={-48} to="map">{langMap['search'][lang]}</NavItem>
                            <NavItem offset={-48} to="about">{langMap['about'][lang]}</NavItem>
                            <NavItem offset={-48} to="join">{langMap['join'][lang]}</NavItem>
                            <NavItem offset={-48} to="register">{langMap['map-register'][lang]}</NavItem>
                            <NavItem offset={-48} to="contact">{langMap['contact'][lang]}</NavItem>
                            <NavItem onClick={handleOnClick}>{langMap['lang'][lang]} <GlobeIcon src={globe} /></NavItem>
                        </NavLinks>
                    )
                }
            </Wrapper>
            {
                isMobile && <MobileLangWrapper><NavItem onClick={handleOnClick}><GlobeIconMobile src={globe} /> {langMap['lang'][lang]} </NavItem></MobileLangWrapper>
            }
        </NavbarWrapper >
    )
}


export default Navbar;