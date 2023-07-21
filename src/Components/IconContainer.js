import React from "react";
import styled from 'styled-components';

import clipboard from '../images/clipboard.png';
import envelope from '../images/envelope.png';
import envelopeblack from '../images/envelopeblack.png';
import facebook from '../images/facebook.png';
import facebookblack from '../images/facebookblack.png';
import instagramblack from '../images/instagramblack.png';

import { colors } from '../style';

const iconMap = {
    'clipboard': clipboard,
    'envelope': envelope,
    'facebook': facebook,
    'envelope-black': envelopeblack,
    'facebook-black': facebookblack,
    'instagram-black': instagramblack,
}

const ButtonWrapper = styled.a`
  display: inline-block;  
  border: 1px solid ${colors.blue};
  padding: 8px 24px;
  margin: 12px 0 24px;
  border-radius: 24px;
  color: ${colors.blue};
  cursor: pointer;
  background-color: white;
  box-shadow: 0px 14px 23px rgba(28, 37, 44, 0.08);
  text-decoration: none;
`;
const LinkWrapper = styled.a`
  padding-bottom: 16px;
  text-align: center;
  color: ${colors.blue};
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const Icon = styled.img`
    margin-right: 8px;
`;
const Text = styled.div`
    font-family: Avenir Next;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
`;

export function IconButton({ icon, title, onClick }) {
    return (
        <ButtonWrapper href={onClick} target="_blank">
            {/* {icon && <Icon src={iconMap[icon]} />} */}
            <Text>{title}</Text>
        </ButtonWrapper>
    )
}
export function IconLink({ icon, title, link, isNewWindow }) {
    return (
        <LinkWrapper href={link} target={isNewWindow ? "_blank" : "_self"}>
            {icon && <Icon src={iconMap[icon]} />}
            <Text>{title}</Text>
        </LinkWrapper>
    )
}

