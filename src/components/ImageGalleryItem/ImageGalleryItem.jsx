import css from "./ImageGalleryItem.module.css";
import propTypes from "prop-types";

export const ImageGalleryItem = ({ image, alt, largeImage, modalOpen }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => modalOpen(largeImage)}>
      <img className={css.ImageGalleryItem_image} src={image} alt={alt} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
    image: propTypes.string.isRequired,
    alt: propTypes.string.isRequired,
    largeImage: propTypes.string.isRequired,
    modalOpen: propTypes.func.isRequired,
};
