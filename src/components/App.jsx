import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { fetchImages } from "../utils/image-servise";

export class App extends Component {
  state = {
    page: 1,
    query: "",
    imageProfiles: [],
    isLoading: false,
    totalHits: "",
    isButtonActive: false,
    showModal: false,
    largeImage: "",
  };

  // export class App extends Component {
  // state = {
  //   page: 1,
  //   query: "",
  //   imageProfiles: [],
  //   isLoading: false,
  //   totalHits: "",
  //   isButtonActive: false,
  //   showModal: false,
  //   largeImage: "",
  // };

  handleSubmit = (query) => {
    if (query === this.state.query) {
      return;
    }
    this.setState({ query, page: 1, imageProfiles: [] });
  };

  getPhotos = async (query, page) => {
    if (!query) {
      return;
    }
    try {
      this.setState({ isLoading: true });
      const {data} = await fetchImages(query, page);
      if (data.hits.length === 0) {
        return;
      }
      this.setState((prevState) => ({
        imageProfiles: [...prevState.imageProfiles, ...data.hits],
        totalHits: data.totalHits,
      }));
    } catch(error) {
      console.log(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (query !== prevState.query || prevState.page !== page) {
      this.setState({
        isLoader: true,
        isButtonActive: page !== 1,
      });
      this.getPhotos(query, page);
    }

    if (
      !prevState.isButtonActive &&
      this.state.totalHits > this.state.imageProfiles.length
    ) {
      this.setState({ isButtonActive: true });
    }
    if (
      prevState.isButtonActive &&
      this.state.totalHits < this.state.imageProfiles.length
    ) {
      this.setState({ isButtonActive: false });
    }
  }

  modalOpen = (largeImage) => {
    this.setState({ largeImage, showModal: true });
  };
  onClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      imageProfiles,
      isButtonActive,
      isLoading,
      largeImage,
      showModal,
    } = this.state;

    return (
      <div
        style={{
          height: "100vh",
          fontSize: 40,
          color: "#010101",
        }}
      >
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          imageProfiles={imageProfiles}
          modalOpen={this.modalOpen}
        />
        {isLoading && <Loader />}
        {isButtonActive && <Button onClick={this.handleLoadMore} />}
        {showModal && <Modal largeImage={largeImage} onClose={this.onClose} />}
      </div>
    );
  }
}
