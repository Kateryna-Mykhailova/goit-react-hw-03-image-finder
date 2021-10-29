import React from 'react';
import styles from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, src, largeImg, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem} key={id} onClick={onClick}>
      <img
        className={styles.ImageGalleryItem_image}
        src={src}
        alt=""
        data-img={largeImg}
      />
    </li>
  );
};

export default ImageGalleryItem;

// const ImageGalleryItem = () => {

// return (<p>fgh</p>)

// }

// export default ImageGalleryItem;
