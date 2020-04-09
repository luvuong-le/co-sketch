import styled from "styled-components";

const Input = styled.input`
    font-size: 1em;
    border: 0;
    color: #ffffff;
    text-align: center;
    padding: 5px;
    font-family: 'Pacifico Regular';
    background: transparent;
    border-bottom: 2px solid #ffffff;
    outline: none;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

export default Input;