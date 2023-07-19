import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import propTypes from "prop-types";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ imageProfiles, modalOpen }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {imageProfiles.map((element) => (
          <ImageGalleryItem
            key={element.id}
            image={element.webformatURL}
            alt={element.tags}
            largeImage={element.largeImageURL}
            modalOpen={modalOpen}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  imageProfiles: propTypes.arrayOf(propTypes.object),
  modalOpen: propTypes.func.isRequired,
};
