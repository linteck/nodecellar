import Backbone from 'backbone';
import * as $ from 'jquery';
import * as _ from 'underscore';

import {connectToBackboneCollection, connectToBackboneModel} from "javascripts/backbonecomp.js";
import Paginator from "javascripts/views/paginator.js";

function WineView(props) {
  // Correct! There is no need to specify the key here:
  let picture;

  if (props.picture) {
    picture = <img src={"pics/" + props.picture} height="150" width="125" alt=""/>;
  } else{
    picture = <img src="pics/generic.jpg" height="150" width="125" alt=""/>;
  }
  return (
    <li>
      <a href={"#wines/" + props._id} className="thumbnail plain" style={{'textAlign': "center"}}>
        {picture}
          <h5>{props.name}</h5>
            {props.year} {props.grapes }<br/>
          <i className="icon-globe"></i> 
            {props.region}, {props.country}
      </a>
    </li>
  );
}

const BcWineView= connectToBackboneModel (WineView);

export default function ExBcWineView (props) {
  console.log(props.model);
  return (
        <BcWineView
          model={props.model}
          page={props.page}
        />
  );
}

window.WineView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteWine",
        "drop #picture" : "dropHandler"
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveWine();
        return false;
    },

    saveWine: function () {
        var self = this;
        console.log('before save');
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('wines/' + model.id, false);
                utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    deleteWine: function () {
        this.model.destroy({
            success: function () {
                alert('Wine deleted successfully');
                window.history.back();
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
        return false;
    },

    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    }

});
