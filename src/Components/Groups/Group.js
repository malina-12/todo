import React, { Component } from "react";
import deleteImg from "../../Images/delete.png";

export default class Group extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
    };
  }

  onInputBlur = (event) => {
    this.props.renameGroup(event.target.value, this.props.id);
    if (event.target.value) {
      this.setState({
        input: event.target.value.trim(),
      });
    } else {
      this.setState({
        input: this.props.name,
      });
    }
	};
	
	onDelete = (event) => {
		event.stopPropagation();
		this.props.deleteGroup(this.props.id)
	}

  render() {
    return (
      <>
        <img
          alt="delete"
          src={deleteImg}
          className="group__delete"
          onClick={this.onDelete}
        />
        <input
          className="group__input"
          type="text"
          defaultValue={this.props.name}
          onBlur={this.onInputBlur}
        />
      </>
    );
  }
}
