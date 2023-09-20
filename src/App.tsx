import React from 'react';
import {Dispatch} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Navigation} from "./components/core/Navigation";
import Refresh from "./components/core/Refresh"
import Login from "./components/core/Login";
import Logout from "./components/core/Logout";
import RangerApp from "./components/ranger/RangerApp";
import {CaseSelection} from "./components/core/CaseSelection";

export interface RangerProps {
    authUser: string,
    setAuthUser: Dispatch<React.SetStateAction<string>>,
    currentCase: string,
    setCurrentCase: Dispatch<React.SetStateAction<string>>,
    isNotesUpdated: boolean,
    setIsNotesUpdated: Dispatch<React.SetStateAction<boolean>>
}


export const RangerContext = React.createContext<RangerProps>({
    authUser: "",
    setAuthUser: () => {
    },
    currentCase: "",
    setCurrentCase: () => {
    },
    isNotesUpdated: true,
    setIsNotesUpdated: () => {
    }
});


export default function App() {
    const cacheAuth = localStorage.getItem('authUser');
    const [authUser, setAuthUser] = React.useState<string>(cacheAuth || "")

    React.useEffect(() => {
        if (authUser !== null)
            localStorage.setItem('authUser', authUser)
    }, [authUser])

    const cacheCurrentCase = localStorage.getItem('current_case');
    const [currentCase, setCurrentCase] = React.useState<string>(cacheCurrentCase || "")

    React.useEffect(() => {
        if (currentCase !== null)
            localStorage.setItem('current_case', currentCase)
    }, [currentCase])

    const [isNotesUpdated, setIsNotesUpdated] = React.useState<boolean>(true)

    const value = {
        authUser,
        setAuthUser,
        currentCase,
        setCurrentCase,
        isNotesUpdated,
        setIsNotesUpdated
    }

    return (
        <BrowserRouter>
            <RangerContext.Provider value={value}>
                    <Navigation/>
                    <Routes>
                        <Route path="/" element={<RangerApp/>}/>
                        <Route path="/case" element={<CaseSelection/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/refresh" element={<Refresh/>}/>
                    </Routes>
            </RangerContext.Provider>
        </BrowserRouter>
    );
}
