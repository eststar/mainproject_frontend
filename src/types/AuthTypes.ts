export interface AuthUser {
    accessToken: string;
    userId: string;
    name: string;
    profile: string;
    success: boolean;
}

export interface JoinRequest {
    id: string;
    nickname: string;
    password: string;
}