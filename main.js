import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FloatingLabel extends React.Component {
  _bind(...methods) {
    methods.map(method => this[method] = this[method].bind(this));
  }
  constructor(props) {
    super(props)
    this.state = { hasValue: false, hasError: false };
    this._bind('onBlur', 'onChange');
  }

  onBlur({ currentTarget }) {
    this.setState({ hasValue: Boolean(currentTarget.value) });
  }

  onChange({ currentTarget }) {
    const { pattern, name, onChangeTrigger } = this.props;
    if (!pattern) {
      this.setState({
        hasError: false,
        hasValue: Boolean(currentTarget.value)
      });
    } else {
      this.setState({
        hasError: !pattern.test(currentTarget.value),
        hasValue: Boolean(currentTarget.value)
      });
    }
    onChangeTrigger({ [name]: currentTarget.value });
  }

  render() {
    const { autoComplete, errorMsg, id, isDisabled, pattern, placeholder, type, name } = this.props;
    const { hasValue, hasError } = this.state;

    const inputClasses = classNames('fl-input', { 'fl-valid': hasValue && !hasError }, { 'fl-invalid': hasValue && errorMsg });
    const errMsgClasses = classNames({ 'fl-error-msg': errorMsg }, { 'fl-error-show': errorMsg });

    return (
      <div className='fl-input-container'>
        <input
          autoComplete={autoComplete}
          className={inputClasses}
          disabled={isDisabled}
          id={id}
          name={name}
          onBlur={this.onBlur}
          onChange={this.onChange}
          type={type} />
        <label className='fl-input-label' htmlFor={id}>{placeholder}</label>
        <span className='fl-input-bar'></span>
        {errorMsg && <span className={errMsgClasses}>{errorMsg}</span>}
      </div>
    );
  }
}

FloatingLabel.propTypes = {
  autoComplete: PropTypes.string,
  errorMsg: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  pattern: PropTypes.any,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool
};

FloatingLabel.defaultProps = {
  autoComplete: "off",
  type: 'text',
  isDisabled: false,
  id: 'text-box',
  placeholder: 'name'
};
