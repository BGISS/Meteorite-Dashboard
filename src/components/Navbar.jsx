import { Nav, Navbar, NavbarCollapse, NavbarToggle,Container,Button } from "react-bootstrap"
import "./Navbar.css"
function NavigationBar({language, toggleLanguage}){
    return(
        <Navbar
         expand="sm"
         bg="dark"
         data-bs-theme="dark"
         fixed="top"
         style={{fontFamily:"Inconsolata"}}>
            <Container>
                <NavbarToggle aria-controls="basic-navbar-nav"/>
                <NavbarCollapse>
                    <Nav id="nav" className="d-flex justify-content-">
                        <Nav.Link href="#dashboard-container">{language==="en"? "Dashboard":"Tableau de Bord"}</Nav.Link>
                    </Nav>
                      <div className="ms-auto d-flex gap-2">
        <Button
          variant={language === "fr" ? "light" : "outline-light"}
          className={language === "fr" ? "selected" : ""}
          onClick={() => toggleLanguage("fr")}
        >
          Fr
        </Button>
        <Button
          variant={language === "en" ? "light" : "outline-light"}
          className={language === "en" ? "selected" : ""}
          onClick={() => toggleLanguage("en")}
        >
          En
        </Button>
      </div>
                </NavbarCollapse>

            </Container>
        </Navbar>
    )
}

export default NavigationBar