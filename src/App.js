import React, { Component } from "react";
import Images from "./components/images";
import Header from "./components/header";

class App extends Component {
  state = {
    tasks: [{ id: 0, title: "کار های روزانه", desc: "انجام کار های روزمره" }],
    isAddNew: false,
    isEdit: false
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
      desc
    };

    tasks.push(task);
    this.setState({ tasks });
  };

  // handleShowTasks = () => {
  //   // var tasks = [...this.state.tasks];
  //   // var showElement = [];
  //   // tasks.map(task => {
  //   //   showElement.push(
  //   //     <div key={task.id} className="task--show-item">
  //   //       <p>{task.title}</p>
  //   //       <p>{task.desc}</p>
  //   //       <button type="button">edit</button>
  //   //     </div>
  //   //   );
  //   // });
  //   // return showElement;

  //   var fileNames = [];
  //   for (let index = 1; index <= 50; index++) {
  //     fileNames.push(`pic (${index}).jpg`);
  //   }
  //   console.log(fileNames);

  //   var imagesInput = (
  //     <div className="container">
  //       {fileNames.map(p => (
  //         <div className="row" key={p}>
  //           <div classanme="col-md-4" md={4}>
  //             <img
  //               className="img-thumbnail"
  //               loading="lazy"
  //               src={`/photos/${p}`}
  //             />
  //           </div>
  //           <div classanme="col-md-4" md={4}>
  //             <img
  //               className="img-thumbnail"
  //               loading="lazy"
  //               src={`/photos/${p}`}
  //             />
  //           </div>
  //           <div classanme="col-md-4" md={4}>
  //             <img
  //               className="img-thumbnail"
  //               loading="lazy"
  //               src={`/photos/${p}`}
  //             />
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );

  //   return imagesInput;
  // };

  render() {
    return (
      <div className="app">
        <Header />
        <Images />
      </div>
    );
  }
}

export default App;
