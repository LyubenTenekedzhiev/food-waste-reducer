import React from "react";

import classes from "./WelcomeSectionRestaurant.module.css";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@material-ui/icons/ThumbDownAltRounded";
import Navigation from "../../../components/UI/Navigation/Navigation";
import { useHistory } from "react-router-dom";

interface LocationState {
  state: {
    restaurantName: string | undefined;
  };
}
interface Props {
  location: LocationState;
}

const WelcomeSectionRestaurant = ({ location }: Props) => {
  const history = useHistory();

  return (
    <div className={classes.WelcomeSectionRestaurant}>
      <div className={classes.WelcomeSectionRestaurant_Content}>
        <div className={classes.WelcomeSectionRestaurant_Header}>
          <Navigation />
        </div>
        <div className={classes.WelcomeSectionRestaurant_TextContainer}>
          <h1 className={classes.WelcomeSectionRestaurant_Text}>{location.state.restaurantName}</h1>
          <p className={classes.WelcomeSectionRestaurant_Description}>For real pizza lovers!</p>
          <div className={classes.WelcomeSectionRestaurant_Keywords}>
            <span>pizza</span>
            <span>salad</span>
            <span>brunch</span>
          </div>
        </div>
        <div className={classes.WelcomeSectionRestaurant_Rating}>
          <div className={classes.WelcomeSectionRestaurant_Votes}>
            <p className={classes.WelcomeSectionRestaurant_VotesAmount}>
              {" "}
              <span>&#128522; 9,6</span> out of 10
            </p>
            <span onClick={() => history.push(`/edit/${location.state.restaurantName}`, { restaurantName: location.state.restaurantName })}>
              edit
            </span>
            <div className={classes.WelcomeSectionRestaurant_Likes}>
              <ThumbUpAltRoundedIcon className={classes.WelcomeSectionRestaurant_Like} />
              <ThumbDownAltRoundedIcon className={classes.WelcomeSectionRestaurant_Like} />
            </div>
          </div>
          <input type='text' placeholder='Search' className={classes.WelcomeSectionRestaurant_Search} />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSectionRestaurant;
