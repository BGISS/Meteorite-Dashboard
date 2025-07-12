
import "./LandingPage.css"
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RotatingEarth from './RotatingEarth';

function LandingPage({t}){
    
    return(
        <div id="landing-page">
     <Canvas camera={{ position: [0, 0, 8], fov: 50 }} shadows>
        <ambientLight  />
        <pointLight position={[10, 10, 10]} />
        <RotatingEarth />
      </Canvas> 
               
                <p>{t.landingPageView} <span>{t.landingPageEarth}</span> {t.landingPageRest} <a href="https://data.nasa.gov/dataset/?res_format=HTML">NASA</a></p>
                
       
        </div>
    )
}

export default LandingPage