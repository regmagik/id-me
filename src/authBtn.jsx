import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
    return (
        <Button variant="secondary" className="ms-auto" onClick={() => handleLogin("redirect")}>Sign in</Button>
    );
}

export const SignOutButton = () => {
    const { instance } = useMsal();
    
    const handleLogout = (logoutType) => {
        if (logoutType === "redirect") {
           instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    }

    return (
        <Button variant="secondary" className="ms-auto" onClick={() => handleLogout("redirect")}>Sign out</Button>
    );
}