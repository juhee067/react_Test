import { SignupProps } from '../pages/Signup'; // SignupProps를 올바르게 가져옵니다.
import { httpClient } from './http';

export const signup = async (userData: SignupProps) => {
  // 화살표 함수로 수정합니다.
  try {
    const response = await httpClient.post('/users/join', userData); // 회원가입 데이터를 서버에 전달합니다.
    return response.data; // 응답 데이터를 반환합니다.
  } catch (error) {
    console.error('Error signing up:', error); // 에러가 발생하면 콘솔에 출력합니다.
    throw error; // 에러를 다시 던져서 상위 호출자가 처리하도록 합니다.
  }
};

export const resetRequest = async (data: SignupProps) => {
  const response = await httpClient.post('/users/reset', data);
  return response.data;
};

export const resetPassword = async (data: SignupProps) => {
  const response = await httpClient.put('/users/reset', data);
  console.log(response.data);
  return response.data;
};

interface LoginResponse {
  token: string;
}
export const signin = async (data: SignupProps) => {
  const response = await httpClient.post<LoginResponse>('/users/signin', data);

  return response.data;
};