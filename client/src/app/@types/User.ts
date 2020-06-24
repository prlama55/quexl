export interface Login {
    email: string
    password: string
}

export interface Auth {
    username: string
    access_token: string
    refresh_token: string
    token_type: string
    expires_in: number
    roles: string[]
}

export interface UserProfile {
    username: string
    roles: string
}

export interface User{
    id: string
    username: string
    email: string
}

export interface Register {
    username: string
    email: string
    password: string
}
