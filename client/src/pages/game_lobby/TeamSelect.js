import React from "react";
import AddCircle from "@material-ui/icons/AddCircle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import Typography from "@material-ui/core/Typography";

import "./TeamSelect.css";

function TeamSelect() {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item className="team">
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography id="red-team" variant="h6" gutterBottom>
              Red Team
            </Typography>
          </Grid>
          <Grid item>
            <List>
              <ListItem>
                <ListItemText secondary="Spymaster">Bonnie</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText secondary="Field Agent">Renyi</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText secondary="Field Agent">Manpreet</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText secondary="Field Agent">Tony (You)</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="Remove">
                    <RemoveCircle />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="team">
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography id="blue-team" variant="h6" gutterBottom>
              Blue Team
            </Typography>
          </Grid>
          <Grid item>
            <List>
              <ListItem>
                <ListItemText secondary="Spymaster">Sina</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText secondary="Field Agent">Jaclyn</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText secondary="Field Agent">
                  (Empty slot)
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="Add">
                    <AddCircle />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText secondary="Field Agent">
                  (Empty slot)
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="Add">
                    <AddCircle />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TeamSelect;
