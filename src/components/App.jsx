import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { fetchImages } from "../utils/image-servise";

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [imageProfiles, setImageProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState("");

  const handleSubmit = (inputQuery) => {
    if (query === inputQuery) {
      return;
    }
    setQuery(inputQuery);
    setPage(1);
    setImageProfiles([]);
  };

  const getPhotos = async (inputQuery, inputPage) => {
    if (!inputQuery) {
      return;
    }
    try {
      setIsButtonActive(false);
      setIsLoading(true);

      const data = await fetchImages(inputQuery, inputPage);
      if (data.hits.length === 0) {
        return;
      }

      setImageProfiles((prevState) => [
        ...prevState,
        ...data.hits,
      ]);
      setTotalHits(data.totalHits);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    getPhotos(query, page);
  }, [query, page]);

  useEffect(() => {
    if (totalHits > imageProfiles.length) {
      setIsButtonActive(true);
    }

    if (totalHits <= imageProfiles.length) {
      setIsButtonActive(false);
    }
  }, [imageProfiles, totalHits]);

  const modalOpen = (inputLargeImage) => {
    setLargeImage(inputLargeImage);
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        fontSize: 40,
        color: "#010101",
      }}
    >
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery imageProfiles={imageProfiles} modalOpen={modalOpen} />
      {isLoading && <Loader />}
      {isButtonActive && <Button onClick={handleLoadMore} />}
      {showModal && <Modal largeImage={largeImage} onClose={onClose} />}
    </div>
  );
};

//   // export class App extends Component {
//   // state = {
//   //   page: 1,
//   //   query: "",
//   //   imageProfiles: [],
//   //   isLoading: false,
//   //   totalHits: "",
//   //   isButtonActive: false,
//   //   showModal: false,
//   //   largeImage: "",
//   // };

//   handleSubmit = (query) => {
//     if (query === this.state.query) {
//       return;
//     }
//     this.setState({ query, page: 1, imageProfiles: [] });
//   };

//   getPhotos = async (query, page) => {
//     if (!query) {
//       return;
//     }
//     try {
//       this.setState({ isLoading: true });
//       const {data} = await fetchImages(query, page);
//       if (data.hits.length === 0) {
//         return;
//       }
//       this.setState((prevState) => ({
//         imageProfiles: [...prevState.imageProfiles, ...data.hits],
//         totalHits: data.totalHits,
//       }));
//     } catch(error) {
//       console.log(error.message);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleLoadMore = () => {
//     this.setState((prevState) => ({ page: prevState.page + 1 }));
//   };

//   componentDidUpdate(_, prevState) {
//     const { page, query } = this.state;
//     if (query !== prevState.query || prevState.page !== page) {
//       this.setState({
//         isLoader: true,
//         isButtonActive: page !== 1,
//       });
//       this.getPhotos(query, page);
//     }

//     if (
//       !prevState.isButtonActive &&
//       this.state.totalHits > this.state.imageProfiles.length
//     ) {
//       this.setState({ isButtonActive: true });
//     }
//     if (
//       prevState.isButtonActive &&
//       this.state.totalHits < this.state.imageProfiles.length
//     ) {
//       this.setState({ isButtonActive: false });
//     }
//   }

//   modalOpen = (largeImage) => {
//     this.setState({ largeImage, showModal: true });
//   };
//   onClose = () => {
//     this.setState({ showModal: false });
//   };

//   render() {
//     const {
//       imageProfiles,
//       isButtonActive,
//       isLoading,
//       largeImage,
//       showModal,
//     } = this.state;

//     return (
//       <div
//         style={{
//           height: "100vh",
//           fontSize: 40,
//           color: "#010101",
//         }}
//       >
//         <Searchbar onSubmit={this.handleSubmit} />
//         <ImageGallery
//           imageProfiles={imageProfiles}
//           modalOpen={this.modalOpen}
//         />
//         {isLoading && <Loader />}
//         {isButtonActive && <Button onClick={this.handleLoadMore} />}
//         {showModal && <Modal largeImage={largeImage} onClose={this.onClose} />}
//       </div>
//     );
//   }
// }
