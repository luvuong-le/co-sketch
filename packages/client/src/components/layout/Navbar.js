import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavList = styled.ul`
    display: flex;
    width: 100%;
    margin: 1rem;
    list-style: none;
`;

const NavItem = styled.li`
    border: 1px solid #ffffff;
    padding: .5rem;
    border-radius: 5px;
    margin: 0 1rem;
`;

const NavLink = styled.div`
    a {
        text-decoration: none;
        color: #ffffff;
    }
`;

const Nav = styled.nav`
    display: flex;
    width: 100%;
    
    ${NavList}:first-child {
        flex: 1;
        align-items: center;
    }

    ${NavList}:last-child {
        justify-content: flex-end;
    }
`;

export default function Navbar() {
    return (
        <Nav>
            <NavList>
                <NavItem>
                    <NavLink>
                        <Link to="/login"> Enter a Room</Link>
                    </NavLink>
                </NavItem>
            </NavList>
        </Nav>
    )
}
