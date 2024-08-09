'use client';

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Avatar, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { generateChatbotResponse } from '../utils/azureOpenAI';

interface ChatbotPreviewProps {
  formData: any;
  onBack: () => void;
}

const ChatbotPreview: React.FC<ChatbotPreviewProps> = ({ formData, onBack }) => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: formData.welcomeMessage || 'Hello! How can I help you today?' }]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      
      const botResponse = await generateChatbotResponse(input, formData);
      const botMessage = { sender: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  return (
    <Box 
      sx={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: '#fff' 
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%', 
          maxWidth: '400px', 
          height: '80%', 
          display: 'flex', 
          flexDirection: 'column', 
          borderRadius: '20px', 
          overflow: 'hidden', 
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' 
        }}
      >
        <Box 
          sx={{ 
            bgcolor: formData.primaryColor, 
            p: 2, 
            display: 'flex', 
            alignItems: 'center' 
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: '#fff', 
              color: formData.primaryColor, 
              mr: 2 
            }}
          >
            {formData.chatbotName ? formData.chatbotName[0].toUpperCase() : 'C'}
          </Avatar>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            {formData.chatbotName || 'Chatbot'}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            p: 2, 
            bgcolor: '#f5f5f5' 
          }}
        >
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box 
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    borderRadius: message.sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                    bgcolor: message.sender === 'user' ? formData.primaryColor : '#fff',
                    color: message.sender === 'user' ? '#000000' : 'text.primary',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Typography>{message.text}</Typography>
                </Paper>
              </Box>
            </motion.div>
          ))}
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            p: 2, 
            bgcolor: '#fff' 
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            sx={{ mr: 1 }}
          />
          <Button 
            variant="contained" 
            onClick={handleSend}
            sx={{ 
              bgcolor: formData.primaryColor, 
              '&:hover': { bgcolor: formData.primaryColor } 
            }}
          >
            Send
          </Button>
        </Box>
      </Paper>
      <Box sx={{ mt: 2 }}>
        <Button 
          onClick={onBack} 
          variant="outlined" 
          sx={{ 
            color: formData.primaryColor, 
            borderColor: formData.primaryColor 
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ChatbotPreview;