import LandingPage from "./components/LandingPage"
import Dashboard from "./components/Dashboard"
import { useState } from "react"
import translations from "./translations"
import "./App.css"
import NavigationBar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("lang") || "en");

const toggleLanguage = () => {
  setLanguage(prev => {
    const newLang = prev === "en" ? "fr" : "en";
    localStorage.setItem("lang", newLang);
    return newLang;
  });
};
 const t = translations[language];
  return (
    <>
    <NavigationBar language={language} toggleLanguage={toggleLanguage}/>
     <LandingPage t={t}/>
     <Dashboard t={t}/> 
     <Footer t={t}/>
    </>
  )
}

export default App
