import React from 'react';
import LoadingIcon from '../photo/loading_icon';
import { Link } from 'react-router-dom';
import ChatroomItem from './chatroom_item';
import { ProtectedRoute } from '../../utils/route_utils';
import { Route } from 'react-router-dom';
import ChatroomPlaceholder from './chatroom_placeholder';
import ChatResultRender from './chat_result_render';
import ChatroomShowContainer from './chatroom_show_container';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.makeChatroom = this.makeChatroom.bind(this);
  }

  componentDidMount() {
    this.props.setSocket();
  }

  componentWillMount() {
    this.props.fetchChatrooms();
  }

  handleSearch(e) {
    this.props.searchDBChat(e.target.value);
  }

  makeChatroom(e) {
    if (e.target !== e.currentTarget) {
      let id = e.target.id;
      this.props.createChatroom(id);
    }
    e.stopPropagation();
  }

  render() {
    let searchResults = this.props.searchResults;
    let chatrooms = this.props.chatrooms.sort(chat => chat.last_message_time);
    let dropdownContent;

    if (searchResults.length === 0) {
      dropdownContent = null;
    } else {
      dropdownContent = (
        <div className='chatroom-dropdown-content' onClick={this.makeChatroom}>
          {
            this.props.searchResults.map(result => (
              <ChatResultRender
                key={result.id}
                result={result}
                createChatroom={this.props.createChatroom}
                />
            ))
          }
        </div>
      );
    }
    return (
      this.props.loading ?
      <LoadingIcon /> :
      <div>
        <div className='messages-container'>
          <div className='chatroom-leftside'>
            <div className='chatroom-leftside-header'>
              <span>Direct Messages</span>
            </div>
            <div className='chatroom-search-container'>
              <input
                className='chatroom-search'
                placeholder='Search'
                onChange={this.handleSearch}
              />
              {dropdownContent}
            </div>
            <section className='chatroom-items'>
              {
                chatrooms.map(chatroom => (
                  <ChatroomItem
                    key={chatroom.id}
                    chatroom={chatroom}
                    currentUser={this.props.currentUser}
                    />
                ))
              }
            </section>
          </div>
          <Route
            exact path='/chatrooms'
            component={ChatroomPlaceholder}/>

          <ProtectedRoute
            path='/chatrooms/:chatroomId'
            component={ChatroomShowContainer}/>
        </div>
      </div>
    );
  }
}

export default Chatroom;
