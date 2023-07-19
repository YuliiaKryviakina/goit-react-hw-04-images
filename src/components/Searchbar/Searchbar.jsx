import { useState } from "react";
import css from "./Searchbar.module.css";
import propTypes from "prop-types";

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = async (e) => {
    e.preventDefault();
    await setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    if (query === "") {
      return;
    }
    if (query === e.target.value) {
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.label}>Search</span>
        </button>

        <input
          className={css.input}
          value={query}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
