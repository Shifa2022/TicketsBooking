
import React, { useEffect,useState } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';




 
const Navbar = () => {
	const [navbarUserIsLogged, setnavbarUserIsLogged] = useState(false);
	useEffect(() => {
	  (async () => {
		const loggedIn = localStorage.getItem('user')
		if (loggedIn) setnavbarUserIsLogged(true);
	  })();
	}, [navbarUserIsLogged]);
	const handleLogout = () => {
		// setUser({});
		// setUsername("");
		// setPassword("");
		localStorage.clear();
		window.location.reload(true);
	  };
return (
	<>
	<Nav>
     <h2 className='logo'>Ticket Booking</h2>
		<Bars />

		<NavMenu>
		<NavLink to='/main' activeStyle>
			Home
		</NavLink>
		<NavLink to='/seats' activeStyle>
			Seats
		</NavLink>
		<NavLink to='/confirmation' activeStyle>
			Confirmation
		</NavLink>
		<NavLink to='/ticket' activeStyle>
			Ticket
		</NavLink>
		{navbarUserIsLogged?
        <>
        <NavLink onClick={handleLogout} to='/login' activeStyle>
			Logout
		</NavLink>
        </>:<>
        <NavLink to='/register' activeStyle>
			Sign Up
		</NavLink>
        <NavBtn>
		<NavBtnLink to='/login'>Sign In</NavBtnLink>
		</NavBtn>
        </>
        }
		</NavMenu>

		
	</Nav>
	</>
);
};

export default Navbar;