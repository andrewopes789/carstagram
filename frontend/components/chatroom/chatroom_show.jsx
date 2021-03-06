import React from 'react';
import LoadingIcon from '../photo/loading_icon';
import { Link } from 'react-router-dom';

class ChatroomShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      chatroom_id: this.props.chatroomId,
      showRight: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    this.props.fetchChatroom(this.props.chatroomId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.chatroomId !== this.props.chatroomId) {
      this.props.fetchChatroom(newProps.match.params.chatroomId);
      this.setState({ chatroom_id: newProps.match.params.chatroomId});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let chatroom = this.props.chatroom;
    let currentUser = this.props.currentUser;
    let recipientId;
    if (chatroom.member1_id === currentUser.id) {
      recipientId = chatroom.member2_id;
    } else {
      recipientId = chatroom.member1_id;
    }
    this.props.createMessage({
      body: this.state.body,
      chatroom_id: this.state.chatroom_id,
      recipient_id: recipientId})
      .then(() => this.setState({body: ''}));
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value} );
    };
  }

  render() {
    let messages = this.props.messages;
    let currentUser = this.props.currentUser;
    let chatroom = this.props.chatroom;
    let photo;
    let username;
    let id;

    if (chatroom.member1_id === currentUser.id) {
      photo = chatroom.member2_img;
      username = chatroom.member2_username;
      id = chatroom.member2_id;
    } else {
      photo = chatroom.member1_img;
      username = chatroom.member1_username;
      id = chatroom.member2_id;
    }

    let messagePointer;
    return (
      this.props.loading ?
      <LoadingIcon /> :
      <div className='message-show-container'>
        <div className='message-recipient-info'>
          <Link
            className='message-recipient-username'
            to={`/users/${id}`}
            >
            {username}
          </Link>
        </div>

        <div className='messages-only'>
          {
            messages.map((message, idx) => {
              if (message.sender_id === currentUser.id) {
                return (
                  <div key={message.id} className='message-item-container'>
                    <div className='message-item-sent'>
                      <span className='message-text'>{message.body}</span>
                      <div
                        className='message-sent-time'
                        >{new Date(message.time).toLocaleString()}</div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={message.id} className='message-item-container'>
                    <div className='message-item-received'>
                      <span className='message-text'>{message.body}</span>
                      <div
                        className='message-received-time'
                        >{new Date(message.time).toLocaleString()}</div>
                    </div>
                  </div>
                );
              }
            })
          }
        </div>

        <div className='message-input-container'>
          <form
            onSubmit={this.handleSubmit}
            >
            <input
              className='message-input'
              placeholder='Write a message...'
              onChange={this.update('body')}
              value={this.state.body}
              />
          </form>
        </div>
      </div>
    );
  }
}

export default ChatroomShow;
