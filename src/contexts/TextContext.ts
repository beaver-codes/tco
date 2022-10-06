import React, { useContext } from "react"
import text from '../utils/texts/base';
import textSv from '../utils/texts/se';


const languageContext = React.createContext('sv');

export function useText() {
    const language = useContext(languageContext);

    let finalText = text;
    switch (language) {
        case 'sv':
            finalText = {
                ...finalText,
                ...textSv,
            }
            break;
    }

    return finalText;
}
