import React from 'react';
import LoadingIcon from '../photo/loading_icon';
import { Link } from 'react-router-dom';

class ChatroomShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchMessages(this.props.chatroomId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.chatroomId !== this.props.chatroomId) {
      this.props.fetchMessages(newProps.match.params.chatroomId);
    }
  }

  render() {
    return (
      this.props.loading ?
      <LoadingIcon /> :
      <div>
      </div>
    );
  }
}

export default ChatroomShow;
