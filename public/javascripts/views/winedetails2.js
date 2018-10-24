import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {connectToBackboneModel} from "javascripts/backbonecomp.js";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2,
  },
  image: {
    width: 256,
    height: 256,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

class ComplexGrid extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, event) {
    this.setState({
            [name]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={'pics/' + this.props.picture} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {this.props.name}
                </Typography>
                <Typography gutterBottom>{this.props.graps}</Typography>
                <Typography gutterBottom>{this.props.country}</Typography>
                <Typography gutterBottom>{this.props.region}</Typography>
                <Typography gutterBottom>{this.props.year}</Typography>
                <Typography color="textSecondary">{this.props.description}</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ cursor: 'pointer' }}>Buy</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

const BcWineView= withStyles(styles)(connectToBackboneModel (ComplexGrid));

export function ExBcWineView (props) {
  console.log(props.model);
  //const theme = createMuiTheme();
  return (
      // <MuiThemeProvider theme={theme}>
        <BcWineView
          model={props.model}
        />
      // </MuiThemeProvider>
  );
}

