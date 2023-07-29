import React from "react";
import { PageLayout } from "./PageLayout";

function App(props) {
	return (
		<PageLayout>
			<p>This is the main app content!</p>
			{props.children}
		</PageLayout>
  );
}

export default App;
