
const BASEURL = process.env.NEXT_PUBLIC_BACK_API_URL;

export const postImage = async (file : File)=>{
    const reqUrl = `${BASEURL}/api/imageupload/upload`;
    const formData = new FormData();
    formData.append('file', file);
    console.log("file", formData);
    
    try {
        const response = await fetch(reqUrl, {
            method: 'POST',
            body: formData, 
        });

        if (!response.ok) {
            // 서버 에러 메시지를 확인하기 위해 로그 추가
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error);    
    }
}