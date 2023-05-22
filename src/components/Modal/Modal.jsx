import React from 'react';
import { Component } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#root-modal');

export default class Modal extends Component {
  // componentDidMount() {
  //   window.addEventListener('keydown', e => {
  //     if (e.code === 'Escape') {
  //       console.log(e.code);
  //       this.props.onClose();
  //       console.log(this.props.onClose);
  //     }
  //   });
  // }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    const { imageUrl, onClose } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal}>
          <img src={imageUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
};
