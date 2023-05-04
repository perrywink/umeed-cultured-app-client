export interface IPost {
  id: number
  title: string
  description?: string
  authorId: number
  updatedAt: Date
  mediaUrl: string
}
