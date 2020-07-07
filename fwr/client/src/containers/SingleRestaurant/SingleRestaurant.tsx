import React, { ReactElement } from "react";

import classes from "./SingleRestaurant.module.css";
import Menu from "./Menu/Menu";
import WelcomeSectionRestaurant from "./WelcomeSectionRestaurant/WelcomeSectionRestaurant";
import Footer from "../../components/UI/Footer/Footer";

interface Props {
  location: any;
}

function SingleRestaurant({ location }: Props): ReactElement {
  return (
    <div>
      <WelcomeSectionRestaurant location={location} />
      <main className={classes.SingleRestaurant_Main}>
        <Menu />
        <div className={classes.SingleRestaurant_Info}>
          <h3 className={classes.SingleRestaurant_InformationTitle}>Venue Information</h3>
          <div className={classes.SingleRestaurant_Address}>
            <h4 className={classes.SingleRestaurant_InfoTitle}>Address</h4>
            <p>Valtetsiou 41</p>
            <p>106 81 Athens</p>
            <a href={`https://www.google.com/maps/place/Pirgos10 dolno ezerovo`} target='blank'>
              See map
            </a>
          </div>
          <div className={classes.SingleRestaurant_Opening}>
            <h4 className={classes.SingleRestaurant_InfoTitle}>Opening times</h4>
            <div className={classes.SingleRestaurant_Hours}>
              <span>Monday</span>
              <span>13:30-24:00</span>
            </div>
            <div className={classes.SingleRestaurant_Hours}>
              <span>Monday</span>
              <span>13:30-24:00</span>
            </div>
            <div className={classes.SingleRestaurant_Hours}>
              <span>Monday</span>
              <span>13:30-24:00</span>
            </div>
            <div className={classes.SingleRestaurant_Hours}>
              <span>Monday</span>
              <span>13:30-24:00</span>
            </div>
            <div className={classes.SingleRestaurant_Hours}>
              <span>Monday</span>
              <span>13:30-24:00</span>
            </div>
          </div>
          <div className={classes.SingleRestaurant_Contact}>
            <h4 className={classes.SingleRestaurant_InfoTitle}>Contact</h4>
            <span>+359 899959115</span>
            <span>test@test.com</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SingleRestaurant;
