import styled from "styled-components";

const Select = styled.select`
    font-size: 1em;
    color: #ffffff;
    border: 0;
    text-align-last: center;
    padding: 5px;
    font-family: 'Pacifico Regular';
    background: transparent;
    border-bottom: 2px solid #ffffff;
    outline: none;
    cursor: pointer;

    &:required:invalid {
        color: rgba(255, 255, 255, 0.5);
    }
`;

export default Select;