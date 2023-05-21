import React from 'react';

import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ pictures, onClick }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {pictures &&
          pictures.hits.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              onClick={() => onClick(largeImageURL)}
            />
          ))}
      </ul>
    </>
  );
};

export default ImageGallery;
