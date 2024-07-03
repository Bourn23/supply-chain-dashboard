// src/components/NotificationPanel.js
// TODO:
// To make this component fully functional and integrated with the rest of the application, you would need to:

// Implement real data fetching from your backend API.
// Set up a websocket or polling mechanism for real-time updates.
// Implement a notification creation system, possibly tied to events in other components (e.g., new items in the watchlist).
// Add more interactive features, such as expanding notifications for more details or taking actions directly from the notification.
// Implement a notification preferences system, allowing users to customize which types of notifications they receive.
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const NotificationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NotificationItem = styled.li`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ priority }) => {
    switch (priority) {
      case 'high':
        return 'background-color: #ffcdd2; border-left: 4px solid #f44336;';
      case 'medium':
        return 'background-color: #fff9c4; border-left: 4px solid #ffeb3b;';
      case 'low':
        return 'background-color: #c8e6c9; border-left: 4px solid #4caf50;';
      default:
        return 'background-color: #e0e0e0; border-left: 4px solid #9e9e9e;';
    }
  }}
`;

const NotificationContent = styled.div`
  flex-grow: 1;
`;

const NotificationTitle = styled.h4`
  margin: 0 0 5px 0;
`;

const NotificationMessage = styled.p`
  margin: 0;
`;

const DismissButton = styled.button`
  background-color: transparent;
  border: none;
  color: #757575;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;

  &:hover {
    color: #333;
  }
`;

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating fetching notifications from an API
    const fetchNotifications = async () => {
      // In a real app, this would be an API call
      const mockNotifications = [
        { id: 1, title: 'High Priority Alert', message: "TechCorp's factory shutdown may cause significant delays in microchip supply.", priority: 'high' },
        { id: 2, title: 'Medium Priority Update', message: 'USD/EUR exchange rate reached a 6-month high.', priority: 'medium' },
        { id: 3, title: 'Low Priority Notification', message: 'New supplier added for raw materials in Asia.', priority: 'low' },
      ];
      setNotifications(mockNotifications);
    };

    fetchNotifications();
  }, []);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <PanelContainer>
      <h2>Alerts and Notifications</h2>
      <NotificationList>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} priority={notification.priority}>
            <NotificationContent>
              <NotificationTitle>{notification.title}</NotificationTitle>
              <NotificationMessage>{notification.message}</NotificationMessage>
            </NotificationContent>
            <DismissButton onClick={() => dismissNotification(notification.id)}>✕</DismissButton>
          </NotificationItem>
        ))}
      </NotificationList>
    </PanelContainer>
  );
};

export default NotificationPanel;