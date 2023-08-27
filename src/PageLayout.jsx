import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SignInButton, SignOutButton } from "./authBtn";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

	const { instance, accounts, inProgress } = useMsal();
    const activeAccount = instance.getActiveAccount();
	console.log('PageLayout activeAccount', activeAccount);
	const [name, setName] = React.useState(activeAccount?.name || "visitor");
	const [other, setOther] = React.useState("no accounts");

//	const me = useAccount();

	React.useEffect(()=>{
		console.log('in useEffect activeAccount', activeAccount);
		if(activeAccount) setName(activeAccount.name);
		else setName("shmizitor");
	}, [activeAccount, accounts, inProgress]
	);
	const accts = instance.getAllAccounts();
	React.useEffect(()=>{
		console.log('in useEffect accts', accts);
		if(accts) setOther('got accounts');
			else setOther("effect");
		},
		[accts, activeAccount, accounts, inProgress]
	);



    return (
        <>
            <Navbar bg="primary" variant="dark">
                <a className="navbar-brand" href="/">Demo</a>
				{ isAuthenticated ? <SignOutButton /> : <SignInButton /> }
            </Navbar>
            <h5>Microsoft Azure Authentication Demo</h5>
			<p>You get to see this text, no matter if you signed in or not.</p>
            <p>Hi {name}</p>
			<Button onClick={()=>{
				const activeAccount = instance.getActiveAccount();
				setName(activeAccount?.name || "who knows...");
			}}>Whoami</Button>
            <p>Hi others {other}</p>
            {isAuthenticated ? <p>You are signed in. You can use the app.</p> : <p>You are not signed in! You need to sign in to use this app.</p>}
			{isAuthenticated && props.children}

			<div>Signed in users on this device: {accts?.length}: {accts?.map(ac=>ac.name).join(',')}</div>
			<div>The app was built with React version: {React.version}</div>
        </>
    );
};