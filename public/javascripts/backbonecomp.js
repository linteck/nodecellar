'use strict';
import Backbone from 'backbone';
import React from 'react';

export function connectToBackboneModel(WrappedComponent) {
  return class BackboneComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = Object.assign({}, props.model.attributes);
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      this.props.model.on('change', this.handleChange);
    }

    componentWillReceiveProps(nextProps) {
      this.setState(Object.assign({}, nextProps.model.attributes));
      if (nextProps.model !== this.props.model) {
        this.props.model.off('change', this.handleChange);
        nextProps.model.on('change', this.handleChange);
      }
    }

    componentWillUnmount() {
      this.props.model.off('change', this.handleChange);
    }

    handleChange(model) {
      this.setState(model.changedAttributes());
    }

    componentDidCatch(error, info) {
      // Display fallback UI
      // this.setState({ hasError: true });
      // You can also log the error to an error reporting service
      console.log(error);
    }

    render() {
      const propsExceptModel = Object.assign({}, this.props);
      delete propsExceptModel.model;
      return <WrappedComponent {...propsExceptModel} {...this.state} />;
    }
  }
}

export function connectToBackboneCollection (WrappedComponent) {
  return class BackboneComponent extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
      this.forceUpdate();
    }

    // componentDidMount() {
    //   this.props.collection.on('add', 'remove', this.handleChange);
    // }

    // componentWillUnmount() {
    //   this.props.collection.off('add', 'remove', this.handleChange);
    // }

    componentDidCatch(error, info) {
      // Display fallback UI
      // this.setState({ hasError: true });
      // You can also log the error to an error reporting service
      console.log(error);
    }

    render() {
      console.log(this.props);
      const propsExceptModel = Object.assign({}, this.props);
      console.log(propsExceptModel );
      // return <WrappedComponent {...propsExceptModel} {...this.state} />;
      return <WrappedComponent {...this.props} />;
    }
  }
}
