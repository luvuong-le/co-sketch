import React from 'react';
import styled from 'styled-components';

const StyledCanvas = styled.canvas`
        display: block;
        background: #ffffff;
        box-shadow: 1px 4px 53px 2px rgba(0, 0, 0, 0.31);
        max-width: ${props => props.width};
        max-height: ${props => props.height};
        margin: 1.5rem auto;
    `;

export default function Canvas({ width, height }) {
    return (
        <StyledCanvas width={width} height={height}></StyledCanvas>
    )
}
