import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'types/AppState';

import { DialogState } from './DialogTypes';
import SigninDialog from './DialogComponent';
import Login from './Login';
import Signup from './Signup';
import ConfirmSignup from './ConfirmSignup';
import ResetPassword from './ResetPassword';
import ConfirmResetPassword from './ConfirmResetPassword';

interface Props {
  state: DialogState;
  onCancel: Function;
  loading: boolean;
}

const getComponent = (state: DialogState) => {
  switch (state.kind) {
    case 'Signup':
      return Signup;
    case 'Login':
      return Login;
    case 'ConfirmSignup':
      return ConfirmSignup;
    case 'ResetPassword':
      return ResetPassword;
    case 'ConfirmResetPassword':
      return ConfirmResetPassword;
    default:
      return undefined;
  }
};

const mapStateToProps = (state: AppState) => ({
  loading: state.signin.loading
});

export default connect(mapStateToProps)(class extends React.Component<Props> {
  render() {
    if (this.props.state.kind !== 'None') {
      return (
        <SigninDialog
          loading={this.props.loading}
          open={true}
          title={this.props.state.title}
          onCancel={this.props.onCancel}
          Content={getComponent(this.props.state)}
        />
      );
    } else {
      return (
        <div />
      );
    }
  }
});