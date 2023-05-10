export interface IMedia {
  id: number
  isThumbnail: boolean
  mediaUrl: string
  postId: number
}

export interface IPostWithMedia {
  id: number
  title: string
  desc?: string
  authorId: number
  updatedAt: Date
  media: IMedia[]
}

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

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus]
