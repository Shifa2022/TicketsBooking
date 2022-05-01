

import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
margin-top:20px;
background: #ffffff;
height: 70px;
display: flex;

margin-right:20px;

width:100%;
justify-content: flex-start;
padding: 0.2rem calc((100vw - 1800px) / 2);
z-index: 12;
/* Third Nav */
/* justify-content: flex-start; */
position: centre;
`;

export const NavLink = styled(Link)`
color: #808080;
display: flex;
justify-content: space-between;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	color: #000000;
}

`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;
margin: 0 auto;
text-align: center;
justify-content: space-between;

}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-right: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */


`;

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 24px;
/* Third Nav */
/* justify-content: flex-end;
width: 100vw; */

`;

export const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #808080;
padding: 10px 22px;
color: #000000;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 24px;
&:hover {
	transition: all 0.2s ease-in-out;
	background: #fff;
	color: #808080;
}

`;

export const NavDropdown = styled.nav`
position: relative;
  display: inline-block;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;

}`;