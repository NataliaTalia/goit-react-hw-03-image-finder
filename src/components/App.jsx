import React from 'react';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    pictureName: '',
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };
  render() {
    const { pictureName } = this.state;
    return (
      <div
        className={css.App}
        // style={{
        //   height: '100vh',
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   fontSize: 40,
        //   color: '#010101',
        // }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery pictureName={pictureName} />
      </div>
    );
  }
}
