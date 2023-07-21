import React from 'react';
import styled from 'styled-components';
import Accordion from 'react-bootstrap/Accordion';

import { useLang } from '../Contexts/LangContext';
import { districtMap, filterMap } from '../consts';

const langMap = {
    'filter-option': { 'zh': '篩選條件', 'en': 'Filter Option' },
    'service-category': { 'zh': '服務類別', 'en': 'Service Category' },
    'district': { 'zh': '地區', 'en': 'District' },
};

const Container = styled.div`
    position: relative;
    margin-bottom: ${props => props.isMobile ? '96px' : '0'};
    overflow: auto;
`;
const HeaderRow = styled.div`
    text-align: center;
    display: flex;
    border-bottom: 1px solid #ECEFF1;
    justify-content: center;
`;
const Header = styled.div`
    font-family: Avenir Next;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    color: #263238;
    padding: 24px 0 16px 0;
`;
const Section = styled.div`
    margin: 32px 0;
    /* padding-bottom: 24px; */
    border-bottom: 1px solid #ECEFF1;
`;
const SectionTitle = styled.div`
    font-family: Avenir Next;
    font-weight: bold;
    font-size: 20px;
    color: #263238;
    margin-bottom: 12px;
    padding: 0 24px;
`;
const ItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px;
`;
const AccordionItem = styled(Accordion.Item)`
    border: none;
`;
const AccordionHeader = styled(Accordion.Header)`
    padding: 0 24px;
    button {
        padding: 12px 0px;
    }
    button:not(.collapsed) {
        color: #000000;
        background-color: transparent;
        box-shadow: none;
    }
    button:focus {
        border: none;
        box-shadow: none;
    }
`;
const AccordionBody = styled(Accordion.Body)`
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    background-color: #ECEFF1;
`;
const CheckboxWrapper = styled.input`
    width: 20px;
    height: 20px;
    .checkbox:checked:before{
        background-color:green;
    }
`;

function FilterOptions({
    setFilterTags,
    setFilterDistricts,
    isMobile,
    filterTags,
    filterDistricts,
}) {
    const [lang] = useLang();

    return (
        <Container isMobile={isMobile}>
            <HeaderRow>
                <Header>{langMap['filter-option'][lang]}</Header>
            </HeaderRow>
            <Section>
                <SectionTitle>{langMap['service-category'][lang]}</SectionTitle>
                {
                    filterMap.map(e =>
                        <CheckboxItem
                            key={`checkbox-${e.id}`}
                            item={e}
                            filterTags={filterTags}
                            setFilterTags={setFilterTags}
                            lang={lang}
                        />
                    )
                }
            </Section>
            <Section>
                <SectionTitle>{langMap['district'][lang]}</SectionTitle>
                <Accordion>
                    {
                        districtMap.map(e =>
                            <DropDownItem
                                key={`dropdown-${e.id}`}
                                item={e.value}
                                index={e.id}
                                title={e.label[lang]}
                                filterDistricts={filterDistricts}
                                setFilterDistricts={setFilterDistricts}
                                lang={lang}
                            />
                        )
                    }
                </Accordion>
            </Section>
        </Container >
    )
}

function CheckboxItem({ item, setFilterTags, lang }) {
    const toggle = e => {
        setFilterTags(prev => {
            if (e.target.checked) {
                return [...prev, e.target.name];
            } else {
                const index = prev.findIndex(item => item === e.target.name);
                const newArr = prev.splice(index, 1);
                return newArr;
            }
        })
    }
    return (
        <ItemWrapper>
            {item.label[lang]}
            <CheckboxWrapper type="checkbox" name={item.value} onChange={toggle} />
        </ItemWrapper>
    );
}

function DropDownItem({ item, index, title, filterDistricts, setFilterDistricts, lang }) {
    const toggle = e => {
        setFilterDistricts(prev => {
            if (e.target.checked) {
                return [...prev, e.target.name];
            } else {
                const index = prev.findIndex(item => item === e.target.name);
                const newArr = prev.splice(index, 1);
                return newArr;
            }
        })
    }
    return (
        <AccordionItem eventKey={index}>
            <AccordionHeader>{title}</AccordionHeader>
            {
                item.map(e =>
                    <AccordionBody key={`accordion-body-${e.id}`}>
                        {e.label[lang]}
                        <CheckboxWrapper type="checkbox" name={e.value} onChange={toggle} />
                    </AccordionBody>
                )
            }
        </AccordionItem>
    );
}

export default FilterOptions;
