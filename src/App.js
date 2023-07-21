import React, { useState, useEffect } from "react";
import './App.css';
import styled from 'styled-components';
import Sheet from 'react-modal-sheet';
import Modal from 'react-modal';
import { debounce } from "debounce";

import useIsMobileHook from './Hooks/useIsMobileHook';

import Map from './Components/Map';
import Navbar from './Components/Navbar';
import Store from './Components/Store';
import FilterOptions from './Components/FilterOptions';
import ContentFormatter from './Components/ContentFormatter';
import { IconButton, IconLink } from './Components/IconContainer';

import { useLang } from "./Contexts/LangContext";
import { useInfo } from "./Contexts/InfoContext";

import landingImg from './images/g10.png'
import logo from './images/logo.png';
import close from './images/x.png';
import tag1 from './images/tag1.png';
import tag2 from './images/tag2.png';
import tag3 from './images/tag3.png';

import { colors, metrics } from './style';
import { districtGeoMap } from "./consts";

const AppContainer = styled.div`
  overflow-x: hidden;
`;
const LandingContainer = styled.div`
  max-width: ${metrics.maxWidth};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 80px 0;
  @media (max-width: ${metrics.maxWidth}) {
    flex-direction: column;
    margin: 24px 0;
    padding: 0 0 24px 0;
  }
`;
const LandingWrapper = styled.div`
  flex: 1;
  text-align: center;
`;
const LandingImage = styled.img`
  /* width: 805px; */
  /* height: 628px; */
  width: 80%;
  @media (max-width: ${metrics.maxWidth}) {
    // transform: translateX(20vw);
  }
`;
const SectionContainer = styled.div`
  max-width: ${metrics.maxWidth};
  width: 100%;
  display: flex;
  margin: 0 auto;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const Section = styled.div`
  flex: 50%;
  margin-bottom: 24px;
  min-width: 0;
  overflow-wrap: anywhere;
  padding-right: 48px;
  
  @media (max-width: ${metrics.maxWidth}) {
    margin: 24px;
    border-bottom: 1px solid #ECEFF1;
    padding-bottom: 24px;
    padding-right: 0;
  }
`;
const SectionTitle = styled.h2`
  font-family: Avenir Next;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  color: #263238;
  margin-bottom: 40px;
  @media (max-width: ${metrics.maxWidth}) {
    margin-bottom: 24px;
  }
`;
const MapSection = styled.div`
  max-width: ${metrics.maxWidth};
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  @media (max-width: ${metrics.maxWidth}) {
    padding: 0 24px;
  }
`;
const MapWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 80px;
  min-height: 50vh;
`;
const LeftWrapper = styled.div`
  flex:1;
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: ${metrics.maxWidth}) {
    margin-right: 0;
  }
`;
const TabRow = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 36px;
  border-bottom: 1px solid #ECEFF1;
`;
const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const TabEllipse = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #263238;
  margin: 8px 0 16px;
`;
const Tab = styled.div`
  font-family: Avenir Next;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  font-size: 18px;
  color: ${props => props.isActive ? '#263238' : '#607D8B'};
`;
const SearchInput = styled.input`
  height: 48px;
  border-radius: 24px;
  outline: none;
  border-color: red;
  border: 1px solid #B0BEC5;
  box-shadow: 0px 4px 8px rgba(28, 37, 44, 0.08);
  // color: #B0BEC5;
  padding: 0 32px;
  margin-bottom: 16px;
`;
// const SearchButton = styled.button`
//   height: 48px;
//   border-radius: 24px;
//   background-color: ${colors.blue};
//   outline: none;
//   border: none;
//   box-shadow: 0px 14px 23px rgba(28, 37, 44, 0.08);
//   margin-bottom: 16px;
//   color: white;
//   font-weight: 700;
//   font-size: 18px;
// `;
const FilledButton = styled.button`
  height: 48px;
  border-radius: 24px;
  background-color: ${colors.blue};
  outline: none;
  border: none;
  box-shadow: 0px 14px 23px rgba(28, 37, 44, 0.08);
  margin: 12px 24px 48px;
  color: white;
  font-weight: 700;
  font-size: 18px;
`;
const FilterButton = styled.button`
  height: 48px;
  border-radius: 24px;
  color: ${colors.blue};
  outline: none;
  border: none;
  box-shadow: 0px 14px 23px rgba(28, 37, 44, 0.08);
  margin-bottom: 16px;
  background-color: white;
  font-weight: 700;
  font-size: 18px;
`;
const ListWrapper = styled.div`
  height: 50vh;
  overflow-y: scroll;
  box-shadow: inset 0 -16px 30px -30px #b2b2b2;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${metrics.maxWidth}) {
    height: 65vh;
  }
`;
// const AboutText = styled.p`
//   margin-bottom: 24px;
// `;
// const AboutItem = styled.li`
//   margin-bottom: 24px;
// `;
// const Row = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: flex-start;
// `;
// const Spacer = styled.div`
//   width: 16px;
// `;
const FooterContainer = styled.div`
  background-color: #E1F6FF;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  justify-content: center;
`;
const Footer = styled.div`
  max-width: ${metrics.maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: ${metrics.maxWidth}) {
    padding: 0 24px;
  }
`;
const FooterText = styled.p`
  & > p {
    margin: 12px 0 0 0;
    text-align: center;
    color: #607D8B;
    @media (max-width: ${metrics.maxWidth}) {
      font-size: 12px;
    }
  }
  margin: 12px 0 0 0;
  text-align: center;
  color: #607D8B;
  @media (max-width: ${metrics.maxWidth}) {
    font-size: 12px;
  }
`;
const FooterLogo = styled.img`
  width: 100px;
  margin: 0 auto;
`;
const CloseButton = styled.img`
  box-sizing: content-box;
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: absolute;
  right: 14px;
  top: 40px;
  padding: 10px;
  z-index: 10;
`;
const TagHints = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  @media (max-width: ${metrics.maxWidth}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const TagTitle = styled.p`
  font-size: 18px;
  font-weight: 500;

  margin-bottom: 4px;
`;
const TagText = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
  @media (max-width: ${metrics.maxWidth}) {
    font-size: 16px;
    margin-bottom: 16px;
  }
`;
const TagIcon = styled.img`
    margin-right: 4px;
    width: 18px;
    height: 18px;
`;

Modal.setAppElement('#root');

const baseUrl = 'https://pharmacistsconnect.org/api';
const langMap = {
  'show-result': { zh: '顯示搜尋結果', en: 'Show Result' },
  'find-your-pharmacists': { zh: '尋找你的藥劑師', en: 'Find Your Pharmacists' },
  'list': { zh: '清單', en: 'List' },
  'map': { zh: '地圖', en: 'Map' },
  'filter-option': { zh: '篩選條件', en: 'Filter Option' },
  'about': { zh: '關於我們', en: 'About Us' },
  'map-register': { zh: '地圖登記', en: 'Map Register' },
  'join': { zh: '加入我們', en: 'Join Us' },
  'contact': { zh: '聯絡我們', en: 'Contact Us' },
  'disclaimer': { zh: '免責聲明', en: 'Disclaimer' },
  'inputPlaceholder': { zh: '輸入你附近的位置', en: 'Search' },
  'filling-prescriptions': { zh: '處方配藥', en: 'Filling Prescriptions' },
  'managing-minor-ailments': { zh: '小病管理', en: 'Managing Minor Ailments' },
  'pharmacist-consultation': { zh: '藥劑師諮詢', en: 'Pharmacist Consultation' },
  'filling-prescriptions-hints': { zh: '覆核醫生處方並提供配藥及藥物輔導服務 (建議先聯絡相關藥房查詢配藥程序，藥物價錢及存貨)', en: 'Review, dispense and counsel on prescribed medications (Prior enquiry on procedures and availability is suggested)' },
  'managing-minor-ailments-hints': { zh: '藥劑師根據患者症狀，提供配藥服務及健康建議，或作相關轉介', en: 'Respond to patients’ symptoms by OTC, health advice and referral to doctors' },
  'pharmacist-consultation-hints': { zh: '提供有關藥物或健康的諮詢服務', en: 'Allow consultation on drug- or health-related problems' },
}

function App() {
  useEffect(() => {
    fetch(`${baseUrl}/pharmacies?_sort=Address_zh&_limit=-1`)
      .then(data => {
        return data.json();
      }).then(data => {
        if (Array.isArray(data)) {
          setStores(data);
          setFilteredStores(data);
        }
      });
    fetch(`${baseUrl}/about-us`)
      .then(data => {
        return data.json();
      }).then(data => {
        setAbout(data);
      });
    fetch(`${baseUrl}/disclaimer`)
      .then(data => {
        return data.json();
      }).then(data => {
        setDisclaimer(data);
      });
    fetch(`${baseUrl}/join-us`)
      .then(data => {
        return data.json();
      }).then(data => {
        setJoin(data);
      });
    fetch(`${baseUrl}/map-register`)
      .then(data => {
        return data.json();
      }).then(data => {
        setMapRegister(data);
      });
    fetch(`${baseUrl}/banner`)
      .then(data => {
        return data.json();
      }).then(data => {
        setBanner(data);
      });
  }, [])

  // hooks
  const isMobile = useIsMobileHook();
  const [lang] = useLang();
  const [infoLocation, setInfoLocation] = useInfo();

  // states
  const [activeTab, setActiveTab] = useState(0); //0: list, 1: map
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [isOpen, setOpen] = React.useState(false);
  const [filterTags, setFilterTags] = React.useState([]);
  const [filterDistricts, setFilterDistricts] = React.useState([]);

  // content state
  const [about, setAbout] = React.useState({});
  const [join, setJoin] = React.useState({});
  const [mapRegister, setMapRegister] = React.useState({});
  const [disclaimer, setDisclaimer] = React.useState({});
  const [banner, setBanner] = React.useState({});


  const handleSearchChange = debounce((e) => {
    let value = e.target.value.toLowerCase();
    let result = [];
    result = stores.filter((store) => {
      const {
        Name_zh: nameZh,
        Name_en: nameEn,
        Address_zh: addressZh,
        Address_en: addressEn,
        Website: website,
      } = store;
      const string = [nameZh, nameEn, addressZh, addressEn, website].join(' ');
      const hasStoreName = string.toLowerCase().search(value) !== -1;

      return hasStoreName;
    });
    setFilteredStores(result);
  }, 500);

  const handleSearchClick = (e) => {
    e.preventDefault();
    let result = [...stores];
    filterTags.map(tag => {
      return result = result.filter((store) => {
        return store[tag] === true
      })
    });

    if (filterDistricts.length > 0) {
      if (filterDistricts.length === 1) {
        console.log('districtGeoMap.filterDistricts[0]', districtGeoMap[filterDistricts[0]]);
        setInfoLocation(districtGeoMap[filterDistricts[0]]);
      }
      result = result.filter(store => {
        return filterDistricts.find(e => e === store.District);
      })
    }
    setFilteredStores(result);
    setOpen(false);
    setFilterTags([]);
    setFilterDistricts([]);
    return false; // Prevent page refresh
  }


  return (
    <AppContainer>
      {isMobile ? <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[600]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <FilterOptions
              filterTags={filterTags}
              filterDistricts={filterDistricts}
              setFilterTags={setFilterTags}
              setFilterDistricts={setFilterDistricts}
            />
          </Sheet.Content>
          <FilledButton onClick={handleSearchClick}>{langMap['show-result'][lang]}</FilledButton>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet> :
        <Modal
          isOpen={isOpen}
          style={customStyles}
        >
          <CloseButton src={close} onClick={() => setOpen(false)} />
          <FilterOptions
            filterTags={filterTags}
            filterDistricts={filterDistricts}
            setFilterTags={setFilterTags}
            setFilterDistricts={setFilterDistricts}
            isMobile={isMobile}
          />
          <FilledButton onClick={handleSearchClick}>{langMap['show-result'][lang]}</FilledButton>
        </Modal>
      }
      <Navbar />
      <LandingContainer>
        {
          banner?.image?.map((e, i) => {
            const url = e?.formats?.medium?.url || '';
            return (
              <LandingWrapper>
                <LandingImage src={`${baseUrl}${url}`} />
              </LandingWrapper>
            )
          })
        }
        {/* <LandingLeftWrapper>
          <LandingTitle>Pharmacists Connect</LandingTitle>
        </LandingLeftWrapper>
        <LandingRightWrapper>
          <LandingImage src={landingImg} />
        </LandingRightWrapper> */}
      </LandingContainer>
      <MapSection name="map">
        <SectionTitle>
          {langMap['find-your-pharmacists'][lang]}
        </SectionTitle>
        <TagHints>
          <TagIcon src={tag1} />
          <TagTitle>
            {langMap['filling-prescriptions'][lang]}：
          </TagTitle>
          <TagText>
            {langMap['filling-prescriptions-hints'][lang]}
          </TagText>
        </TagHints>

        <TagHints>
          <TagIcon src={tag2} />
          <TagTitle>
            {langMap['managing-minor-ailments'][lang]}：
          </TagTitle>
          <TagText>
            {langMap['managing-minor-ailments-hints'][lang]}
          </TagText>
        </TagHints>

        <TagHints>
          <TagIcon src={tag3} />
          <TagTitle>
            {langMap['pharmacist-consultation'][lang]}：
          </TagTitle>
          <TagText>
            {langMap['pharmacist-consultation-hints'][lang]}
          </TagText>
        </TagHints>
        <br />
        {
          isMobile &&
          <LeftWrapper>
            <SearchInput placeholder={langMap['inputPlaceholder'][lang]} type="text" onChange={(e) => handleSearchChange(e)} />
            <FilterButton onClick={() => setOpen(true)}>{langMap['filter-option'][lang]}</FilterButton>
            <TabRow>
              <TabWrapper onClick={() => setActiveTab(0)}>
                <Tab isActive={activeTab === 0}>{langMap['list'][lang]}</Tab>
                {activeTab === 0 && <TabEllipse />}
              </TabWrapper>
              <TabWrapper onClick={() => setActiveTab(1)}>
                <Tab isActive={activeTab === 1}>{langMap['map'][lang]}</Tab>
                {activeTab === 1 && <TabEllipse />}
              </TabWrapper>
            </TabRow>
          </LeftWrapper>
        }
        <MapWrapper>
          {((isMobile && activeTab === 0) || !isMobile) && <LeftWrapper>
            {
              !isMobile &&
              <>
                <SearchInput placeholder={langMap['inputPlaceholder'][lang]} type="text" onChange={(e) => handleSearchChange(e)} />
                {/* <SearchButton>搜尋</SearchButton> */}
                <FilterButton onClick={() => setOpen(true)}>{langMap['filter-option'][lang]}</FilterButton>
              </>
            }
            <ListWrapper>
              {
                filteredStores.map((e, i) => <Store key={`store-${i}`} store={e} setActiveTab={setActiveTab} />)
              }
            </ListWrapper>
          </LeftWrapper>}
          {((isMobile && activeTab === 1) || !isMobile) && <div style={{ flex: 2 }}><Map stores={filteredStores} /></div>}
        </MapWrapper>
      </MapSection>
      <SectionContainer>
        <Section name="about">
          <SectionTitle>
            {langMap['about'][lang]}
          </SectionTitle>
          <ContentFormatter data={about} />
        </Section>
        <Section name="register">
          <SectionTitle>
            {langMap['map-register'][lang]}
          </SectionTitle>
          <ContentFormatter data={mapRegister} />
        </Section>
        <Section name="join">
          <SectionTitle>
            {langMap['join'][lang]}
          </SectionTitle>
          <ContentFormatter data={join} />
        </Section>
        <Section name="contact">
          <SectionTitle>
            {langMap['contact'][lang]}
          </SectionTitle>
          <IconLink link="mailto: contact.pharmacistsconnect@gmail.com" title="contact.pharmacistsconnect@gmail.com" icon="envelope-black" />
          <IconLink link="https://www.facebook.com/pharmacistsconnect" title="pharmacistsconnect" icon="facebook-black" isNewWindow />
          <IconLink link="https://www.instagram.com/pharmacistsconnect" title="pharmacistsconnect" icon="instagram-black" isNewWindow />
        </Section>
      </SectionContainer >
      <FooterContainer>
        <Footer>
          <FooterLogo src={logo} alt="logo" />
          <FooterText>{langMap['disclaimer'][lang]}</FooterText>
          <FooterText>
            <ContentFormatter data={disclaimer} />
          </FooterText>
        </Footer>
      </FooterContainer>
    </AppContainer >
  );
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '80%',
  },
};

export default App;
