import { useState } from 'react';

interface User {
  id: number;
  name: string;
  profile_image: string | null;
}

interface Comment {
  id: number;
  user_id: number;
  post_id: number;
  parent_comment_id: number | null;
  comment: string;
  created_at: string;
  updated_at: string;
  replies: Comment[];
  user: User;
}

export function useCommentsTree(initialComments: Comment[], currentUser: User) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const insertReplyToTree = (tree: Comment[], parentId: number, newReply: Comment): Comment[] => {
    return tree.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }

      return {
        ...comment,
        replies: insertReplyToTree(comment.replies || [], parentId, newReply),
      };
    });
  };

  const removeCommentFromTree = (tree: Comment[], commentId: number): Comment[] => {
    return tree
      .map(comment => ({
        ...comment,
        replies: removeCommentFromTree(comment.replies || [], commentId),
      }))
      .filter(comment => comment.id !== commentId);
  };

  const addComment = (newCommentData: Omit<Comment, 'replies' | 'user'>, parentId?: number) => {
    const newComment: Comment = {
      ...newCommentData,
      replies: [],
      user: currentUser,
    };

    if (parentId) {
      setComments(prev => insertReplyToTree(prev, parentId, newComment));
    } else {
      setComments(prev => [...prev, newComment]);
    }
  };

  const deleteComment = (commentId: number) => {
    setComments(prev => removeCommentFromTree(prev, commentId));
  };

  return {
    comments,
    setComments, // optional kalau mau reset semua
    addComment,
    deleteComment,
  };
}
