import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

interface Props {
  mealAdded: boolean;
  mealRemoved: boolean;
  setMealAdded: (mealAdded: boolean) => void;
  children?: string;
}

export default function CustomizedSnackbars({ mealAdded, setMealAdded, mealRemoved, children }: Props) {
  const classes = useStyles();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setMealAdded(mealAdded ? !mealAdded : !mealRemoved);
  };
  
  return (
    <div className={classes.root}>
      <Snackbar open={mealAdded ? mealAdded : mealRemoved} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          {mealAdded ? "Meal successfully added!" : "Meal successfully removed!"}
        </Alert>
      </Snackbar>
    </div>
  );
}
