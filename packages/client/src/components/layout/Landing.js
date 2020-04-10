import React, { useEffect } from 'react';
import Canvas from '@components/canvas/Canvas';
import Container from "@components/layout/Container";
import Subtitle from "@components/heading/Subtitle";

export default function Landing() {
    return (
        <Container>
            <Subtitle>Collabratively draw on a canvas with your friends.</Subtitle>
            <Canvas width="800" height="600" />
        </Container>
    )
}
