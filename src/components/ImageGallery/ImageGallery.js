import React from 'react';
import styles from '../ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
  return (
    <>
      <ul className={styles.ImageGallery}>
        {/* <li>jhgf</li> */}
        {images.map(image => {
          return (
            // <div><p>{image.id} </p>
            <ImageGalleryItem
              onClick={onClick}
              key={image.id}
              src={image.webformatURL}
              largeImg={image.largeImageURL}
            />
            //   </div>
          );
        })}
      </ul>
      {/* <button type="button" onClick={onClick}>Load more</button> */}
    </>
  );
};

export default ImageGallery;
