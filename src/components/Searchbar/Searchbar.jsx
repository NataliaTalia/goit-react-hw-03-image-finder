import React from 'react';
import { Component } from 'react';
import css from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from 'binoculars-icon.svg';

export default class Searchbar extends Component {
  state = {
    pictureName: '',
  };

  handleInput = e => {
    this.setState({ pictureName: e.currentTarget.value.toLowerCase() });
    console.log(e.currentTarget.value);
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.pictureName.trim() === '') {
      alert('Please write the name of the image');
      return;
    }
    this.props.onSubmit(this.state.pictureName);
    this.setState({ pictureName: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.pictureName}
            onChange={this.handleInput}
          />
          <button type="submit" className={css.SearchFormButton}>
            <SearchIcon className={css.SearchFormButtonIcon} />
          </button>
        </form>
      </header>
    );
  }
}
