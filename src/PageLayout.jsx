import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton, SignOutButton } from "./authBtn";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <a className="navbar-brand" href="/">Demo</a>
				{ isAuthenticated ? <SignOutButton /> : <SignInButton /> }
            </Navbar>
            <h5>Microsoft Authentication Demo</h5>
			<p>You get to see this text, no matter if you signed in or not.</p>
            {isAuthenticated ? <p>You are signed in. You can use the app.</p> : <p>You are not signed in! You need to sign in to use this app.</p>}
			{isAuthenticated && props.children}
        </>
    );
};