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
            onClick={function() {
              const sheet = new CSSStyleSheet();
              sheet.replaceSync(
                `.img-${fileName}{width:75%; height:75%; margin:auto;}`
              );

              // Apply the stylesheet to a document:
              document.adoptedStyleSheets = [sheet];
            }}
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
          className="btn btn-info"
          onClick={this.handleChangePage}
        >
          {index}
        </button>
      );
    }

    return (
      <div className="btn-group" role="group">
        {paginateBtns}
      </div>
    );
  };

  handleChangePage = event => {
    this.setState({ index: event.target.value });
  };

  handleCahngeTotalToShow = event => {
    this.setState({ totalToShow: event.target.value });
  };

  handleClickImage = event => {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = event.target;
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function() {
      modal.style.display = "block";
      modalImg.src = event.target.src;
      modalImg.alt = event.target.alt;
      captionText.innerHTML = event.target.alt;
    };

    // When the user clicks on <span> (x), close the modal
    modal.onclick = function() {
      modalImg.className += " out";
      setTimeout(function() {
        modal.style.display = "none";
        modalImg.className = "modal-content";
      }, 200);
    };
  };

  render() {
    var totalToShow = this.state.totalToShow;

    return (
      <Fragment>
        <div id="my-modal" className="modal">
          <img id="img01" className="modal-content"></img>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <label id="exampleInputEmail1">Top Show</label>
              <input
                id="total-to-show"
                min="10"
                type="number"
                defaultValue={20}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="number of show"
                onChange={this.handleCahngeTotalToShow}
              />
              <small>select the top count of items to show</small>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">{this.showImages({ totalToShow })}</div>
          <div className="row justify-content-center">
            <this.handlePages />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Images;
