import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex max-w-[95%] md:max-w-[85%] animate-fadeIn ${isUser ? 'self-end' : 'self-start'}`}>
      <div
        className={`px-5 py-4 rounded-xl leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm'
            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
