import React from 'react';
import styles from '../ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <ul className={styles.ImageGallery}>
      {/* <li>jhgf</li> */}
      {images.map(image => {
        return (
          // <div><p>{image.id} </p>
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            largeImg={image.largeImageURL}
          />
          //   </div>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
