import css from "./Button.module.css";
import propTypes from "prop-types";

export const Button = ({ onClick }) => {
  return (
    <div className={css.buttonContainer}>
      <button className={css.button} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};
