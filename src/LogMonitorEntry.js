import React, { PropTypes, Component } from 'react';
import LogMonitorEntryAction from './LogMonitorEntryAction';
import shouldPureComponentUpdate from 'react-pure-render/function';

const styles = {
  entry: {
    display: 'block',
    WebkitUserSelect: 'none'
  }
};

export default class LogMonitorEntry extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    action: PropTypes.object.isRequired,
    actionId: PropTypes.number.isRequired,
    select: PropTypes.func.isRequired,
    error: PropTypes.string,
    onActionClick: PropTypes.func.isRequired,
    collapsed: PropTypes.bool
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  handleActionClick() {
    const { actionId, onActionClick } = this.props;
    if (actionId > 0) {
      onActionClick(actionId);
    }
  }

  consoleLogInfo(actionId, action, state, error) {
    console.group(actionId, action.type);

    console.log('action', action);
    if (error) {
      console.log('error', error);
    } else {
      console.log('state', state);
    }

    console.groupEnd();
  }

  render() {
    const { actionId, error, action, state, collapsed } = this.props;
    const styleEntry = {
      opacity: collapsed ? 0.5 : 1,
      cursor: (actionId > 0) ? 'pointer' : 'default'
    };

    return (
      <div style={{
        textDecoration: collapsed ? 'line-through' : 'none',
        color: this.props.theme.base06
      }}>
        <LogMonitorEntryAction
          theme={this.props.theme}
          action={action}
          onClick={this.handleActionClick}
          style={{...styles.entry, ...styleEntry}}/>
        {!collapsed &&
          <div style={{color: this.props.theme.base06, paddingTop: 8, paddingBottom: 7, paddingLeft: 16 }}>
            {actionId} <a style={{textDecoration: 'underline', color: this.props.theme.base06}} onClick={() => this.consoleLogInfo(actionId, action, state, error)}>Log to Console</a>
          </div>
        }
      </div>
    );
  }
}
