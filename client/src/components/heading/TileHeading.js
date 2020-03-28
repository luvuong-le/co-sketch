import React from 'react'
import styled from 'styled-components';

const Letter = styled.span`
    display: block;
    background: #ffffff;
    color: #aaa;
    text-transform: uppercase;
    width: 120px;
    height: 120px;
    line-height: 120px;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.1);
    transition: transform .5s ease-in-out, background-color .5s ease-in-out, color .5s ease-in-out;

    &:first-child {
        border-radius: 5px 0 0 5px;
    }

    &:last-child {
        border-radius: 0 5px 5px 0;
    }
`;

const TileHeadingContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    transition: transform .5s ease-in-out;

    &:hover ${Letter}:nth-child(odd) {
        transform: skewY(15deg);
    }

    &:hover ${Letter}:nth-child(even) {
        transform: skewY(-15deg);
        background-color: #f9f9f9;
        color: #a6a6a6;
    }
`;

export default function TileHeading({ title }) {
    return (
        <TileHeadingContainer>
            {title.split('').map(char => (
                <Letter>{char}</Letter>  
            ))}
        </TileHeadingContainer>
    )
}
