import React, { ReactElement } from "react";

import classes from "./RestaurantGrid.module.css";
import styles from "./RestaurantColumn.module.css";

interface Props {
  name: string;
  image: string | undefined;
  description: string | undefined;
  pickUp: string | undefined;
  keywords: string | undefined;
  gridLayout: boolean;
  showRestaurant: () => void;
}

function Restaurant({ name, image, gridLayout, description, pickUp, keywords, showRestaurant }: Props): ReactElement {
  const style = gridLayout ? classes : styles;

  return (
    <div className={style.Restaurant} onClick={showRestaurant}>
      <figure className={style.Restaurant_Figure}>
        <img src={image} alt={`Restaurant ${name}`} className={style.Restaurant_Image} />
        <div className={style.Restaurant_Figcaption}>
          <div className={style.Restaurant_Info}>
            <div className={style.Restaurant_Description}>
              <h3 className={style.Restaurant_Name}>{name}</h3>
              <p className={style.Restaurant_Paragraph}>{description}</p>
            </div>
            <h4 className={style.Restaurant_PickUp}>{gridLayout ? pickUp : `Pick up time: ${pickUp}`}</h4>
          </div>
          <div className={style.Restaurant_Categories}>
            <p>{keywords}</p>
          </div>
        </div>
      </figure>
    </div>
  );
}

export default Restaurant;
