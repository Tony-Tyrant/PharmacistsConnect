import React, { useEffect } from 'react';
import styled from 'styled-components';
import direction from '../images/direction.png';
import { colors, metrics } from '../style';
import useIsMobileHook from '../Hooks/useIsMobileHook';
import { useLang } from "../Contexts/LangContext";
import { IconButton } from '../Components/IconContainer';


function ContentFormatter({ data }) {
    const [lang] = useLang();
    return (
        <>
            {data[lang]?.split('\n').map(e => {
                if (e[0] !== '[') {
                    return <p>{e}</p>
                }
                if (e[0] === '[') {
                    const buttonText = e.match(/\[([^)]+)\]/)?.[1];
                    const url = e.match(/\(([^)]+)\)/)?.[1];


                    return <IconButton title={buttonText} onClick={url} />
                }
            })}
        </>
    )
}

export default ContentFormatter
