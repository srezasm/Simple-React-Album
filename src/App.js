import React, { Component } from "react";
import Images from "./components/images";
import Header from "./components/header";

class App extends Component {
  state = {
    tasks: [{ id: 0, title: "کار های روزانه", desc: "انجام کار های روزمره" }],
    isAddNew: false,
    isEdit: false,
  };

  GetCount = () => {
    return this.state.tasks.length;
  };

  handleAddNewTask = () => {
    this.setState({ isAddNew: !this.state.isAddNew });
  };

  handlCreateTask = () => {
    var tasks = [...this.state.tasks];
    const title = document.getElementById("new-title").value;
    const desc = document.getElementById("new-desc").value;
    const task = {
      id: tasks[tasks.length - 1].id + 1,
      title,
      desc,
    };

    tasks.push(task);
    this.setState({ tasks });
  };

  handleShowModal = () => {
    var modal = document.getElementById("my-modal");
    var image = document.getElementById("modal-image");
    var content = document.getElementsByTagName("body")[0];

    content.style.setProperty("overflow", "unset");
    image.setAttribute("src", "");
    modal.style.setProperty("display", "none");
  };

  render() {
    return (
      <div className="app">
        <div onClick={this.handleShowModal} id="my-modal">
          <img id="modal-image"></img>
        </div>
        <Header />
        <Images />
      </div>
    );
  }
}

export default App;
