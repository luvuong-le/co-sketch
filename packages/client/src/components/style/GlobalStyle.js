import { createGlobalStyle } from "styled-components";
import RighteousRegular from "@assets/fonts/Righteous-Regular.ttf";
import PacificoRegular from "@assets/fonts/Pacifico-Regular.ttf";
import PoppinsRegular from "@assets/fonts/Poppins-Regular.ttf";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pacifico Regular';
        src: url(${PacificoRegular});
    }

    @font-face {
        font-family: 'Righteous Regular';
        src: url(${RighteousRegular});
    }

    @font-face {
        font-family: 'Poppins Regular';
        src: url(${PoppinsRegular});
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
        width: 100%;
        color: #ffffff;
        background: #4285F4;
        font-family: 'Righteous Regular', sans-serif;
    }

    .input--error {
        border-bottom: 2px solid red;
    }
`

export default GlobalStyle;