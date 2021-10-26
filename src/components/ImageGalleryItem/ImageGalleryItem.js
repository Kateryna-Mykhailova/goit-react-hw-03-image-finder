import React from 'react';

const ImageGalleryItem = ({ id, src, largeImg }) => {
  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        src={src}
        alt=""
        data-img={largeImg}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

export default ImageGalleryItem;

// const ImageGalleryItem = () => {

// return (<p>fgh</p>)

// }

// export default ImageGalleryItem;
