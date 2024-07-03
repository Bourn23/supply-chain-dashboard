// src/components/Chatbox.js
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatboxWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  height: ${props => props.isExpanded ? '400px' : '50px'};
`;

const ChatHeader = styled.div`
  background-color: #1a237e;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

const ChatMessages = styled.div`
  height: calc(100% - 100px);
  overflow-y: auto;
  padding: 10px;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-top: 1px solid #eee;
`;

const Message = styled.div`
  margin-bottom: 10px;
  ${props => props.isUser ? 'text-align: right;' : ''}
`;

const CLAUDE_API_KEY = 'your_claude_api_key_here';

function Chatbox({ onResponse }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post('https://api.anthropic.com/v1/conversations', {
        prompt: input,
        max_tokens_to_sample: 300,
        model: 'claude-v1',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': CLAUDE_API_KEY,
        },
      });

      const botMessage = { text: response.data.completion, isUser: false };
      setMessages(prev => [...prev, botMessage]);

      // Parse the bot's response and update the dashboard
      const dashboardUpdates = parseBotResponse(response.data.completion);
      onResponse(dashboardUpdates);
    } catch (error) {
      console.error('Error calling Claude API:', error);
      setMessages(prev => [...prev, { text: 'Sorry, I encountered an error.', isUser: false }]);
    }
  };

  const parseBotResponse = (response) => {
    // This is a placeholder function. In a real application, you'd implement
    // logic here to parse the bot's response and extract relevant updates
    // for the map, watchlist, and analytics.
    return {
      mapUpdate: null,
      watchlistUpdate: null,
      analyticsUpdate: null,
    };
  };

  return (
    <ChatboxWrapper isExpanded={isExpanded}>
      <ChatHeader onClick={() => setIsExpanded(!isExpanded)}>
        Chat with Supply Chain AI
      </ChatHeader>
      {isExpanded && (
        <>
          <ChatMessages>
            {messages.map((msg, index) => (
              <Message key={index} isUser={msg.isUser}>
                {msg.text}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
          <form onSubmit={handleSubmit}>
            <ChatInput
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
          </form>
        </>
      )}
    </ChatboxWrapper>
  );
}

export default Chatbox;