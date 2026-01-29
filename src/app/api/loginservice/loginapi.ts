"use server"

import { AuthUser } from "@/types/AuthTypes";
import { JoinRequest } from "@/types/AuthTypes";

const BASEURL = process.env.NEXT_PUBLIC_BACK_API_URL;

export const loginAPI = async (email: string, password: string) => {
    const reqUrl = `${BASEURL}/api/members/login`;

    try {
        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: email,
                password: password
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`HTTP error! status: ${response.status}` + `, 에러 데이터: ${errorData}`);
        }

        const data = await response.json();
        console.log("[API result] Status:", data);
        return data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error;
    }
};

export const logoutAPI = async (authInfo: AuthUser) => {
    const reqUrl = `${BASEURL}/api/members/logout`;

    try {
        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authInfo.accessToken}`,
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // const data = await response.json();
        return;// data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error;
    }
};

export const signupAPI = async (JoinRequest: JoinRequest) => {
    const reqUrl = `${BASEURL}/api/members/signup`;
    
    try {
        console.log("회원가입 정보 :", { id: JoinRequest.id, nickname: JoinRequest.nickname, password: JoinRequest.password });
        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": JoinRequest.id,
                "nickname": JoinRequest.nickname,
                "password": JoinRequest.password,
            }
            ),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // const data = await response.json();
        return;// data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error;
    }
};

export const signoutAPI = async (email: string, password: string) => {
    const reqUrl = `${BASEURL}/api/members/signout`;

    try {
        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error;
    }
};