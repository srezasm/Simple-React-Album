import React, { Component, Fragment } from "react";

class Images extends Component {
  constructor() {
    super();
    var fileNames = require.context("../../public/photos", false, /.*/).keys();
    this.state = {
      fileNames: [...fileNames],
      totalToShow: 20,
      index: 1
    };
  }

  showImages = () => {
    var images = [];

    this.state.fileNames.forEach(fileName => {
      images.push(
        <div key={fileName} className="col-md-3">
          <img
            id={`img-${fileName}`}
            className="img img-thumbnail"
            height="250px"
            width="250px"
            loading="lazy"
            src={`/photos/${fileName}`}
            onClick={this.handleShowModal}
          />
        </div>
      );
    });

    const total = this.state.totalToShow;
    const index = this.state.index;

    if (total == 0) return null;

    images = images.slice(total * (index - 1), index * total);

    return images;
  };

  handlePages = () => {
    var pageCount = Math.ceil(
      this.state.fileNames.length / this.state.totalToShow
    );
    var paginateBtns = [];

    for (let index = 1; index <= pageCount; index++) {
      paginateBtns.push(
        <button
          key={index}
          type="button"
          value={index}
          className="btn btn-info bnt-sm"
          onClick={this.handleChangePage}
        >
          {index}
        </button>
      );
    }

    return (
      <div className="btn-group btn-group-sm mt-4 mb-4" role="group">
        {paginateBtns}
      </div>
    );
  };

  handleChangePage = event => {
    this.setState({ index: event.target.value });
    document.getElementById("images-container").scrollTop = 0;
  };

  handleCahngeTotalToShow = event => {
    this.setState({ totalToShow: event.target.value });
  };

  handleShowModal = event => {
    var modal = document.getElementById("my-modal");
    var image = document.getElementById("modal-image");
    var content = document.getElementsByTagName("body")[0];

    content.style.setProperty("overflow", "hidden");
    image.setAttribute("src", event.target.src);
    modal.style.setProperty("display", "flex");
  };

  render() {
    return (
      <Fragment>
        <div className="container mt-4 mb-4">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <label id="exampleInputEmail1">Top Show</label>
              <select
                className="form-control"
                onChange={this.handleCahngeTotalToShow}
              >
                <option defaultValue>20</option>
                <option>40</option>
                <option>60</option>
                <option>80</option>
                <option>100</option>
                <option value={this.state.fileNames.length}>all</option>
              </select>
              <small>select the top count of items to show</small>
            </div>
          </div>
          <hr />
        </div>
        <div id="images-container" className="container">
          <div className="row">{this.showImages()}</div>
          <div className="row justify-content-center">
            <this.handlePages />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Images;
