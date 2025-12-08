export const buildCommentTree = (comments: any[]) => {
  const map = new Map<string, any>();
  const roots: any[] = [];

  // Initialize map with all comments
  comments.forEach(comment => {
    map.set(comment._id, {
      ...comment,
      replies: [],
      depth: comment.ancestors?.length || 0,
    });
  });

  // Build tree
  comments.forEach(comment => {
    if (comment.parentComment) {
      const parent = map.get(comment.parentComment);
      if (parent) {
        parent.replies.push(map.get(comment._id)!);
      }
    } else {
      roots.push(map.get(comment._id)!);
    }
  });

  // Sort replies by date (oldest first or newest — your choice)
  const sortReplies = (node: any) => {
    node.replies.sort((a: any, b: any) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    node.replies.forEach(sortReplies);
  };

  roots.forEach(sortReplies);

  return roots;
};