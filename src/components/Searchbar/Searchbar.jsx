import { Component } from "react";
import css from "./Searchbar.module.css";
import propTypes from "prop-types";

export class Searchbar extends Component {
  state = {
    query: "",
  };

  handleChange = async (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
    if (this.state.query === "") {
      return;
    }
    if (this.state.query === e.target.value) {
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={css.header}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.label}>Search</span>
          </button>

          <input
            className={css.input}
            value={query}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
