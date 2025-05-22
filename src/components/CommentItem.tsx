// components/CommentItem.tsx
import { X, Send } from 'lucide-react';
import {formatDate} from "@/lib/date";

interface CommentItemProps {
  comment: Comment;
  replyingTo: { id: number | null; name: string };
  onReply: (state: { id: number | null; name: string }) => void;
  onDelete: (id: number) => void;
  replyText: string;
  onReplyTextChange: (text: string) => void;
  onSubmitReply: () => void;
  currentUserId?: number;
}

export const CommentItem = ({
  comment,
  replyingTo,
  onReply,
  onDelete,
  replyText,
  onReplyTextChange,
  onSubmitReply,
  currentUserId,
}: CommentItemProps) => {
  const isAuthor = comment?.user?.id === currentUserId;
  const isReplying = replyingTo.id === comment.id;

  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex space-x-4 flex-1">
          <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">
            {comment?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900">{comment?.user?.name}</h4>
              <span className="text-xs text-gray-500">
                {formatDate(comment?.created_at)}
              </span>
            </div>
            <p className="text-black mt-1">{comment?.comment}</p>
            
            {/* Reply Button */}
            <button
              onClick={() => onReply(
                isReplying 
                  ? { id: null, name: '' } 
                  : { id: comment.id, name: comment?.user?.name }
              )}
              className="text-blue-600 text-xs mt-2 hover:underline"
            >
              {isReplying ? 'Batal' : 'Balas'}
            </button>

            {/* Reply Form */}
            {isReplying && (
              <div className="mt-3 pl-4 border-l-2 border-gray-200">
                <textarea
                  rows={2}
                  className="w-full border text-black border-gray-300 rounded p-2 text-sm"
                  placeholder={`Tulis balasan untuk ${comment?.user?.name}...`}
                  value={replyText}
                  onChange={(e) => onReplyTextChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onSubmitReply();
                    }
                  }}
                />
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => onReply({ id: null, name: '' })}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Batal
                  </button>
                  <button
                    onClick={onSubmitReply}
                    disabled={!replyText.trim()}
                    className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded transition ${
                      replyText.trim()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Balasan</span>
                  </button>
                </div>
              </div>
            )}

            {/* Replies List */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-200">
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    replyingTo={replyingTo}
                    onReply={onReply}
                    onDelete={onDelete}
                    replyText={replyText}
                    onReplyTextChange={onReplyTextChange}
                    onSubmitReply={onSubmitReply}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Delete Button (only show if user is author) */}
        {isAuthor && (
          <button
            onClick={() => onDelete(comment.id)}
            className="text-gray-400 hover:text-red-500"
            aria-label="Hapus komentar"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};