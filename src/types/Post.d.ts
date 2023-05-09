export type Post = {
    title: string,
    author: string,
    desc: string,
    status?: PostStatus,
    rejectDsc?: string
};

export type Media = {
    mediaUrl: string,
    postId: number,
    isThumbnail?: boolean
}

export type PostTags = {
    tagIds: number [],
    postId: number
}

export const PostStatus: {
    APPROVED: APPROVED
    REJECTED: REJECTED
    IN_REVIEW: IN_REVIEW
};

export const PostType: {
    MY_POST: MY_POST
    USER_POST: USER_POST
}

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus]
export type PostType = (typeof PostType)[keyof typeof PostType]