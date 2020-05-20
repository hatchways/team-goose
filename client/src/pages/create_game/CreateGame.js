import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

import Header from "../common/Header";
import "./CreateGame.css";

function CreateGame() {
  return (
    <>
      <Container>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item className="header">
            <Header title="Welcome" />
          </Grid>
          <Grid item>
            <Grid container justify="center" alignItems="center">
              <Grid item className="panel">
                <Grid container direction="column">
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h6" gutterBottom>
                          Join a Game:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center">
                          <Grid item className="grid-input">
                            <Input placeholder="Enter Game ID" />
                          </Grid>
                          <Grid item>
                            <Button variant="contained" color="primary">
                              Join
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className="panel">
                <Grid container direction="column">
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h6" gutterBottom>
                          Create Game:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button variant="contained">Create</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CreateGame;
