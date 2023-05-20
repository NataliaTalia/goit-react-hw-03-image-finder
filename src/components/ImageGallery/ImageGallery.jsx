import React from 'react';
import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { Blocks } from 'react-loader-spinner';

import Button from 'components/Button/Button';
import css from './ImageGallery.module.css';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    pictures: null,
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.pictureName !== this.props.pictureName) {
      console.log('prevProps', prevProps.pictureName);
      console.log('current prop', this.props.pictureName);
      console.log('Prop updated, will be new fetch');

      this.setState({ loading: true, pictures: null });
      fetch(
        `https://pixabay.com/api/?q=${this.props.pictureName}&page=1&key=34942352-0200edd486f0f1b00fc000a19&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(`No image with ${this.props.pictureName} name`)
          );
        })
        .then(pictures => {
          if (pictures.hits.length === 0) {
            alert('There is no match');
          } else {
            this.setState({ pictures });
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      loading: true,
      page: prevState.page + 1,
    }));
    fetch(
      `https://pixabay.com/api/?q=${this.props.pictureName}&page=${
        this.state.page + 1
      }&key=34942352-0200edd486f0f1b00fc000a19&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          `Failed to fetch images for page ${this.state.page + 1}`
        );
      })
      .then(newPictures => {
        this.setState(prevState => ({
          pictures: {
            ...prevState.pictures,
            hits: [...prevState.pictures.hits, ...newPictures.hits],
          },
          loading: false,
        }));
      })
      .catch(error => this.setState({ error, loading: false }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  openModal = imageURL => {
    this.setState({
      selectedImage: imageURL,
      showModal: true,
    });
  };

  render() {
    const { error, loading, pictures, selectedImage, showModal } = this.state;
    return (
      <>
        {showModal && (
          <Modal imageUrl={selectedImage} onClose={this.toggleModal} />
        )}
        <ul className={css.ImageGallery}>
          {error && <h1>{error.message}</h1>}
          {loading && (
            <Blocks
              visible={true}
              height="180"
              width="180"
              ariaLabel="blocks-loading"
              wrapperStyle={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              wrapperClass={css.BlocksWrapper}
            />
          )}

          {pictures &&
            pictures.hits.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
                onClick={() => this.openModal(largeImageURL)}
              />
            ))}
        </ul>
        {pictures && <Button onClick={this.handleLoadMore} />}
      </>
    );
  }
}
