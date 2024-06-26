import { loginRes, registerRes, user } from "@/types/user";
import { postRequest, getRequest, patchRequest } from "./axiosFunctions";

const BaseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function handleLogin(
  email: string,
  password: string
): Promise<any> {
  try {
    return await postRequest(`${BaseURL}/users/login/`, { email, password });
  } catch (error: any) {
    throw error;
  }
}

export async function handleRegister(
  name: string,
  email: string,
  username: string,
  password: string
): Promise<registerRes> {
  try {
    return await postRequest(`${BaseURL}/users/register/`, {
      name,
      email,
      username,
      password,
    });
  } catch (error: any) {
    throw error;
  }
}

export async function handleJoinOrg(orgCode: string): Promise<loginRes> {
  try {
    return await postRequest(`${BaseURL}/users/joinorg/`, {
      invite_code: orgCode,
    });
  } catch (error: any) {
    throw error;
  }
}

export async function handleCreateOrg(
  name: string,
  industry: string,
  location: string,
  logo: string
): Promise<string> {
  try {
    return await postRequest(`${BaseURL}/users/createorg/`, {
      name,
      industry,
      location,
      logo,
    });
  } catch (error: any) {
    throw error;
  }
}

export async function getUserData(): Promise<user[]> {
  try {
    return await getRequest(`${BaseURL}/users/user/`);
  } catch (error: any) {
    throw error;
  }
}

export async function updateUser({ body }: { body: any }): Promise<any> {
  try {
    return await patchRequest(`${BaseURL}/users/user/`, body);
  } catch (error: any) {
    throw error;
  }
}

export async function approveUser(user: string): Promise<any> {
  try {
    return await postRequest(`${BaseURL}/users/approve/`, null, { user });
  } catch (error: any) {
    throw error;
  }
}

export async function handleForgetPass(email: string): Promise<any> {
  try {
    return await postRequest(`${BaseURL}/users/reset_password/`, { email });
  } catch (error: any) {
    throw error;
  }
}

export async function handleVerifyOTP(
  otp: number,
  new_password: string,
  email: string
): Promise<{ msg?: string; error?: string }> {
  try {
    return await postRequest(
      `${BaseURL}/users/verify_reset_password_otp/?email=${email}`,
      { otp: Number(otp), new_password: new_password }
    );
  } catch (error: any) {
    throw error;
  }
}
