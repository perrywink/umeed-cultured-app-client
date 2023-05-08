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
