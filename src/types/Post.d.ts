export type Post = {
    title: string,
    author: string,
    userId: number,
    status?: PostStatus,
    rejectDsc?: string
};

export type Media = {
    mediaUrl: string,
    postId: number,
    isThumbnail?: boolean
}
export const PostStatus: {
    APPROVED: APPROVED
    REJECTED: REJECTED
    IN_REVIEW: IN_REVIEW
};

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus]