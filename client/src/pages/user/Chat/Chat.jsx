import React from 'react';
import ChatComponent from '../../../components/users/chat/ChatComponent';
import PageWrapper from '../../../components/admin/PageWrapper';
import SideNav from '../../../components/sideNav/SideNav';
import NavBar from '../../../components/users/navBar/NavBar';

const ChatPage = () => {
  return (
    <PageWrapper>
        <SideNav/>
        <NavBar/>
        <ChatComponent/>
      </PageWrapper>
  );
};

export default ChatPage;
