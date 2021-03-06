import React, { useEffect, createRef } from 'react';
import styled from 'styled-components';
import WebSocketClient from "@components/providers/WebSocketClient";

const StyledCanvas = styled.canvas`
        display: block;
        background: #ffffff;
        box-shadow: 1px 4px 53px 2px rgba(0, 0, 0, 0.31);
        max-width: ${props => props.width};
        max-height: ${props => props.height};
        margin: 1.5rem auto;
    `;

export default function Canvas({ width, height, location }) {
    const canvas = createRef();
    let context = createRef();

    useEffect(() => {
        // Line Information Object 
        /**
         * isClicked: Has the user clicked down to begin drawing
         * isMoving: The user is currently moving the mouse and drawing
         * positionCurrent: Current x and y of the user
         * positionPrevious: Previous position of the user (Needed for moveTo function)
         * userColor: Stroke color of the user drawing
         * type: Type of event
         */
        let lineInfo = {
            isClicked: false,
            isMoving: false,
            positionCurrent: { x: 0, y: 0 },
            positionPrevious: { x: 0, y: 0 },
            userColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            type: null
        }

        const handleStartDraw = (e) => {
            lineInfo.type = e.type;
            lineInfo.isClicked = true;

            const x = e.touches && e.touches.length !== 0 ? e.touches[0].clientX : e.pageX;
            const y = e.touches && e.touches.length !== 0 ? e.touches[0].clientY : e.pageY;

            // Current position and previous move to position will be the same
            // Set the current position
            lineInfo.positionCurrent = { x, y };

            // Get Mouse Coordinates for previous for MoveTo()
            lineInfo.positionPrevious = { x, y };

            // Begin Drawing
            context.current.beginPath();

            // Make sure to minus the offset of the canvas
            context.current.moveTo(x - canvas.current.offsetLeft, y - canvas.current.offsetTop);

            // Emit event to other users 
            WebSocketClient.instance.send(JSON.stringify(lineInfo));
        }

        const handleDrawFinish = (e) => {
            lineInfo.type = e.type;
            lineInfo.isClicked = false;
            lineInfo.isMoving = false;
            context.current.closePath();
        }

        const handleDrawing = (e) => {
            lineInfo.type = e.type;
            lineInfo.isMoving = true;

            const x = e.touches && e.touches.length !== 0 ? e.touches[0].clientX : e.pageX;
            const y = e.touches && e.touches.length !== 0 ? e.touches[0].clientY : e.pageY;

            if (lineInfo.isClicked && lineInfo.isMoving) {
                lineInfo.positionPrevious = {
                    x: lineInfo.positionCurrent.x,
                    y: lineInfo.positionCurrent.y
                }
                lineInfo.positionCurrent = { x, y };

                // Make sure to minus the offset of the canvas
                context.current.lineTo(x - canvas.current.offsetLeft, y - canvas.current.offsetTop);

                // Set Stroke to color of user drawing to Black
                context.current.strokeStyle = '#000000'
                context.current.stroke();

                // Emit event to other users 
                WebSocketClient.instance.send(JSON.stringify(lineInfo));
            }
        }
        
        const setupCanvas = () => {
            context.current = canvas.current.getContext("2d");
            context.current.lineWidth = 2;
        };

        const setCanvasListeners = () => {
            // Handle Drawing by other users
            WebSocketClient.instance.listen("USERS_DRAWN", (data) => {
                if (canvas.current) {
                    context.current.beginPath();

                    let lineData = JSON.parse(data.detail.lineInfo);

                    // Make sure to minus the offset of the canvas
                    context.current.moveTo(lineData.positionPrevious.x - canvas.current.offsetLeft, lineData.positionPrevious.y - canvas.current.offsetTop);
                    context.current.lineTo(lineData.positionCurrent.x - canvas.current.offsetLeft, lineData.positionCurrent.y - canvas.current.offsetTop);
                    context.current.strokeStyle = lineData.userColor;
                    context.current.stroke();
                    context.current.closePath();
                }
            });

            WebSocketClient.instance.listen("HISTORY_SENT", () => {
                // Only let users draw after the history was retrieved successfully

                if (canvas.current) {
                    // Mousedown (Click) Canvas Event
                    canvas.current.addEventListener('mousedown', handleStartDraw);
                    canvas.current.addEventListener('touchstart', handleStartDraw);

                    // Mouseup (Click Up) Canvas Event
                    canvas.current.addEventListener('mouseup', handleDrawFinish);
                    canvas.current.addEventListener('touchend', handleDrawFinish);

                    // Mousemove (Drag) Canvas Event
                    canvas.current.addEventListener('mousemove', handleDrawing);
                    canvas.current.addEventListener('touchmove', handleDrawing);
                }
            })
        }

        setupCanvas();
        setCanvasListeners();

        WebSocketClient.instance.send(JSON.stringify({
            type: "GET_HISTORY"
        }));

        return () => {}
    }, [canvas, context])

    return (
        <StyledCanvas width={width} height={height} ref={canvas}></StyledCanvas>
    )
}
