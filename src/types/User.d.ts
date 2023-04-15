export type PGUser = {
  email: string
  username: string
  contact: string
  userType: Role
  blocked: boolean
  onboarded: boolean
}

export type RegUser = {
  email: string
  contact: string
  username: string
  userType: Role
}

export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};
  
export type Role = (typeof Role)[keyof typeof Role]