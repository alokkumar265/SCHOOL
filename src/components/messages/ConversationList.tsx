import React from 'react';
import { Conversation } from '@/types/communication';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/frontend/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversation: Conversation) => void;
  className?: string;
}

export const ConversationList = ({ 
  conversations, 
  selectedConversationId, 
  onSelectConversation,
  className
}: ConversationListProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getOtherParticipant = (conversation: Conversation) => {
    // Robustly find the participant who is not the current user
    return conversation.participants.find(p => p.id !== "current-user") || conversation.participants[0];
  };

  return (
    <div className={cn("flex flex-col overflow-hidden", className)}>
      <div className="text-sm font-medium px-4 py-2">
        Conversations
      </div>
      <div className="flex-1 overflow-auto">
        {conversations.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            No conversations yet
          </div>
        ) : (
          <div className="space-y-px">
            {conversations.map(conversation => {
              const otherParticipant = getOtherParticipant(conversation);
              const lastMessage = conversation.lastMessage;
              const isSelected = selectedConversationId === conversation.id;
              
              return (
                <button
                  key={conversation.id}
                  className={cn(
                    "w-full flex items-start gap-3 px-4 py-3 text-left",
                    "hover:bg-muted/50 transition-colors",
                    isSelected ? "bg-muted" : ""
                  )}
                  onClick={() => onSelectConversation(conversation)}
                >
                  <Avatar className="h-9 w-9 flex-shrink-0">
                    <AvatarImage src={otherParticipant.avatar} />
                    <AvatarFallback>
                      {getInitials(otherParticipant.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="font-medium truncate">{otherParticipant.name}</div>
                      {lastMessage && (
                        <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true })}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <div className="text-sm text-muted-foreground truncate">
                        {lastMessage ? lastMessage.content : "Start a conversation"}
                      </div>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
