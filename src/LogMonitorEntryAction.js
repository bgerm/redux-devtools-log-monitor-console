import React, { Component } from 'react';

const styles = {
  actionBar: {
    paddingTop: 8,
    paddingBottom: 7,
    paddingLeft: 16
  }
};

export default class LogMonitorAction extends Component {
  render() {
    const { type } = this.props.action;
    return (
      <div style={{
        backgroundColor: this.props.theme.base02,
        color: this.props.theme.base06,
        ...this.props.style
      }}>
        <div style={styles.actionBar}
          onClick={this.props.onClick}>
          {type}
        </div>
      </div>
    );
  }
}
