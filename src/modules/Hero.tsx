import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';

import CloudsCanvas from '../components/CloudsCanvas';
import WelcomeBlurb from "../components/WelcomeBlurb";


const Hero = () => {
    return (
      <>
        <CssBaseline />
        <Grid container sx={{ position: "absolute", minWidth: "100%", height: "100vh"}}>
            <CloudsCanvas />              
        </Grid>
        <Grid container sx={{ position: 'absolute', top: '50%', left: '50%', width: '400px'}}>
          <WelcomeBlurb />          
        </Grid>
      </>

    )
};

export default Hero;