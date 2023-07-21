import React, { useEffect } from 'react';
import styled from 'styled-components';
import direction from '../images/direction.png';
import { colors, metrics } from '../style';
import useIsMobileHook from '../Hooks/useIsMobileHook';
import { useInfo } from "../Contexts/InfoContext";
import { useLang } from "../Contexts/LangContext";
import tag1 from '../images/tag1.png';
import tag2 from '../images/tag2.png';
import tag3 from '../images/tag3.png';


const StoreWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid #ECEFF1;
    padding: 24px 0;
    flex-direction: column;
`;
const TopWrapper = styled.div`
    display: flex;
`;
const BottomWrapper = styled.div`
    padding-top: 8px;
`;
const TopLeftWrapper = styled.div`
    flex: 2;
`;
const TopRightWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`;
const StoreName = styled.div`
    font-family: Avenir Next;
    font-weight: bold;
    font-size: 24px;
    color: #263238;
    margin-bottom: 2px;

    @media (max-width: ${metrics.maxWidth}) {
        font-size: 20px;
    }
`;
const InfoText = styled.div`
    font-weight: 500;
    font-size: 14px;
    color: #607D8B;
    margin-bottom: 8px;

    @media (max-width: ${metrics.maxWidth}) {
        font-size: 12px;
    }
`;
const MapButton = styled.div`
    border: 1px solid ${colors.blue};
    padding: 8px 16px;
    border-radius: 24px;
    text-align: center;
    color: ${colors.blue};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
const MapIcon = styled.img`
    margin-right: 4px;
`;
const Tags = styled.div`
    display: flex;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;
const Tag = styled.div`
    font-family: Avenir Next;
    font-size: 12px;
    font-weight: 600;
    color: #455A64;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #B0BEC5;
    padding: 8px 12px;
    margin-right: 12px;
    white-space: nowrap;
`;

const TagIcon = styled.img`
    margin-right: 4px;
    width: 12px;
    height: 12px;
`;
const langMap = {
    prescription: { 'zh': '處方配藥', 'en': 'Prescription' },
    minorIllness: { 'zh': '小病管理', 'en': 'Minor Illness' },
    pharmacistsEnquiry: { 'zh': '藥劑師諮詢', 'en': 'Pharmacists Enquiry' },
    mapMobile: { 'zh': '地圖', 'en': 'Map' },
    map: { 'zh': '地圖顯示', 'en': 'Map' }
}

function Store({ store, setActiveTab }) {
    let name = '', address = '';
    const {
        id,
        Name_zh: nameZh,
        Name_en: nameEn,
        Address_zh: addressZh,
        Address_en: addressEn,
        Phone: phone,
        Prescription: prescription,
        Minor_Illness: minorIllness,
        Pharmacists_Enquiry: pharmacistsEnquiry,
        Longtitude: longtitude,
        Latitude: latitude,
        Website: website,
    } = store;

    const isMobile = useIsMobileHook();
    const [infoLocation, setInfoLocation] = useInfo();
    const [lang] = useLang();

    if (lang === 'zh') {
        name = nameZh;
        address = addressZh;
    } else if (lang === 'en') {
        name = nameEn;
        address = addressEn;
    }

    const handleMapClick = () => {
        setActiveTab(1);
        setInfoLocation(store)
    }

    return (
        <StoreWrapper key={id}>
            <TopWrapper>
                <TopLeftWrapper>
                    <StoreName>
                        {name}
                    </StoreName>
                    <InfoText>
                        {address}
                    </InfoText>
                    <InfoText>
                        {phone}
                    </InfoText>
                    <InfoText>
                        {website}
                    </InfoText>
                </TopLeftWrapper>
                <TopRightWrapper>
                    {/* <MapButton onClick={() => setInfoLocation({ lat: latitude, lng: longtitude })}> */}
                    <MapButton onClick={handleMapClick}>
                        <MapIcon src={direction} />
                        {isMobile ? langMap['mapMobile'][lang] : langMap['map'][lang]}
                    </MapButton>
                </TopRightWrapper>
            </TopWrapper>
            <BottomWrapper>
                <Tags>
                    {prescription && <Tag><TagIcon src={tag1} />{langMap['prescription'][lang]}</Tag>}
                    {minorIllness && <Tag><TagIcon src={tag2} />{langMap['minorIllness'][lang]}</Tag>}
                    {pharmacistsEnquiry && <Tag><TagIcon src={tag3} />{langMap['pharmacistsEnquiry'][lang]}</Tag>}
                </Tags>
            </BottomWrapper>
        </StoreWrapper>
    )
}

export default Store
