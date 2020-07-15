import React, { ReactElement } from "react";

import classes from "./AboutPage.module.css";
import Navigation from "../../components/UI/Navigation/Navigation";
import Footer from "../../components/UI/Footer/Footer";

function AboutPage(): ReactElement {
  return (
    <div className={classes.AboutPage}>
      <header className={classes.AboutPage_Header}>
        <Navigation />
      </header>
      <main className={classes.AboutPage_Main}>
        <h2 className={classes.AboutPage_Title}>About FWR</h2>
        <p className={classes.AboutPage_Paragraph}>
          FWR is a food platform that connects hungry customers with great restaurants and special prices. The main idea behind it is to
          make your meals more affordable while helping you lead a sustainable lifestyle and hence reducing your carbon footprint. Enjoy!
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
