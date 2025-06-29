
import React, { useRef, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '@/types/communication';
import { cn } from '@/frontend/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Paperclip, Download } from 'lucide-react';

interface MessageViewProps {
  messages: Message[];
  currentUserId: string;
  className?: string;
}

export const MessageView = ({ messages, currentUserId, className }: MessageViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-muted-foreground">
        No messages yet. Start a conversation!
      </div>
    );
  }

  return (
    <div className={cn("flex-1 overflow-y-auto p-4 space-y-4", className)}>
      {messages.map((message, index) => {
        const isSelf = message.senderId === currentUserId;
        const showAvatar = !isSelf || (index > 0 && messages[index - 1].senderId !== message.senderId);
        
        return (
          <div 
            key={message.id}
            className={cn("flex", isSelf ? "justify-end" : "justify-start")}
          >
            {!isSelf && showAvatar && (
              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                <AvatarImage src={message.senderAvatar} />
                <AvatarFallback>{getInitials(message.senderName)}</AvatarFallback>
              </Avatar>
            )}
            
            <div className={cn(
              "max-w-[80%]",
              isSelf ? "ml-12" : "mr-12"
            )}>
              {!isSelf && (
                <div className="text-sm font-medium mb-1">{message.senderName}</div>
              )}
              
              <div className={cn(
                "rounded-lg p-3 text-sm",
                isSelf ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                {message.content}
                
                {message.attachment && (
                  <div className="mt-2 flex items-center gap-2 p-2 rounded bg-background/20">
                    <Paperclip className="h-4 w-4" />
                    <span className="text-xs flex-1 truncate">{message.attachment}</span>
                    <Download className="h-4 w-4" />
                  </div>
                )}
              </div>
              
              <div className="text-xs text-muted-foreground mt-1">
                {formatTime(message.timestamp)}
                {isSelf && message.read && (
                  <span className="ml-1">· Read</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageView;
