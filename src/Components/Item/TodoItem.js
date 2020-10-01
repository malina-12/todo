import React, { Component } from 'react';

export class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };
  }

  onInputBlur = (event) => {
    this.props.onUpdateItemValue(event.target.value, this.props.id);
    this.setState({
      input: event.target.value.trim(),
    });
  };

  componentDidMount() {
    if (!this.props.value) {
      this.focusInput.focus();
    }
  }

  render() {
    return (
      <>
        <label className='main__checkbox'>
          <input
            type='checkbox'
            onChange={this.props.onCheckItem}
            checked={this.props.done}
          />
          <span className='checkmark'></span>
        </label>

        <input
          className='main__input'
          type='text'
          defaultValue={this.props.value}
          onBlur={this.onInputBlur}
          ref={input => (this.focusInput = input)}
        />

        <span
          className='delete'
          onClick={this.props.onDeleteItem}
        ></span>
      </>
    );
  }
}
