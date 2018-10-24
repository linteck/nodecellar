import Backbone from 'backbone';
import * as $ from 'jquery';
import * as _ from 'underscore';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {connectToBackboneModel} from "javascripts/backbonecomp.js";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

class WineView extends React.Component {
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
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.props.name}
          margin="normal"
        />
        <TextField
          id="wineId"
          label="ID"
          value={this.props._id}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          required
          id="grapes"
          label='Grapes'
          defaultValue={this.props.grapes}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          error
          id="country"
          label="Country:"
          defaultValue={this.props.country}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-read-only-input"
          label="Region"
          defaultValue={this.props.region}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="standard-dense"
          label="Year:"
          className={classNames(classes.textField, classes.dense)}
          defaultValue={this.props.year}
          margin="dense"
        />
        <TextField
          id="standard-multiline-flexible"
          label="Notes:"
          multiline
          rowsMax="4"
          value={this.props.description}
          onChange={(e)=>this.handleChange('description', e)}
          className={classes.textField}
          margin="normal"
        />
        <div className="span4">
            <div className="well" >
                <p><img id="picture" width="180" src={'pics/' + this.props.picture} /></p>
                <p id="hint">To change the picture, drag a new picture from your file system onto the box above.</p>
            </div>
        </div>
      </form>
    );
  }
}

WineView.propTypes = {
  classes: PropTypes.object.isRequired,
};





const BcWineView= withStyles(styles)(connectToBackboneModel (WineView));

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

// window.WineView = Backbone.View.extend({

//     initialize: function () {
//         this.render();
//     },

//     render: function () {
//         $(this.el).html(this.template(this.model.toJSON()));
//         return this;
//     },

//     events: {
//         "change"        : "change",
//         "click .save"   : "beforeSave",
//         "click .delete" : "deleteWine",
//         "drop #picture" : "dropHandler"
//     },

//     change: function (event) {
//         // Remove any existing alert message
//         utils.hideAlert();

//         // Apply the change to the model
//         var target = event.target;
//         var change = {};
//         change[target.name] = target.value;
//         this.model.set(change);

//         // Run validation rule (if any) on changed item
//         var check = this.model.validateItem(target.id);
//         if (check.isValid === false) {
//             utils.addValidationError(target.id, check.message);
//         } else {
//             utils.removeValidationError(target.id);
//         }
//     },

//     beforeSave: function () {
//         var self = this;
//         var check = this.model.validateAll();
//         if (check.isValid === false) {
//             utils.displayValidationErrors(check.messages);
//             return false;
//         }
//         this.saveWine();
//         return false;
//     },

//     saveWine: function () {
//         var self = this;
//         console.log('before save');
//         this.model.save(null, {
//             success: function (model) {
//                 self.render();
//                 app.navigate('wines/' + model.id, false);
//                 utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');
//             },
//             error: function () {
//                 utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
//             }
//         });
//     },

//     deleteWine: function () {
//         this.model.destroy({
//             success: function () {
//                 alert('Wine deleted successfully');
//                 window.history.back();
//             },
//             error: function () {
//                 utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
//             }
//         });
//         return false;
//     },

//     dropHandler: function (event) {
//         event.stopPropagation();
//         event.preventDefault();
//         var e = event.originalEvent;
//         e.dataTransfer.dropEffect = 'copy';
//         this.pictureFile = e.dataTransfer.files[0];

//         // Read the image file from the local file system and display it in the img tag
//         var reader = new FileReader();
//         reader.onloadend = function () {
//             $('#picture').attr('src', reader.result);
//         };
//         reader.readAsDataURL(this.pictureFile);
//     }

// });
