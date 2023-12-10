import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"
import { About } from "./pages/About";
import { AuthPage } from "./pages/AuthPage";
import { Create } from "./pages/Create";
import { Notes } from "./pages/Notes";


export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Routes>
				<Route exact path="/" element={<Notes />}/>
				<Route exact path="/create" element={<Create />}/>
				<Route exact path="/about" element={<About />}/>
				<Route path="*" element={<Navigate to="/" replace />}/>
			</Routes>
		)
	}

	return (
		<Routes>
			<Route exact path="/" element={<AuthPage />}/>
			<Route path="*" element={<Navigate to="/" replace />}/>
		</Routes>
	)
}