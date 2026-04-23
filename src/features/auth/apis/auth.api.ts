"use server";

import { IApiResponse } from "@/shared/types/api";
import {
  LoginResponse,
  LoginCredentials,
  RegisterResponse,
} from "../types/auth";
import { HEADERS } from "@/shared/constants/api-headers.constants";
import {
  EmailFormData,
  OtpFormData,
  RegisterFormData,
} from "../schemas/register.schema";
import { ResetPasswordFormData } from "../schemas/reset-password.schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (credentials: LoginCredentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      ...HEADERS.JSON,
    },
  });

  const data: IApiResponse<LoginResponse> = await response.json();

  return data;
};

export const sendEmailVerification = async (values: EmailFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/send-email-verification`, {
    method: "POST",
    body: JSON.stringify({ email: values.email }),
    headers: {
      ...HEADERS.JSON,
    },
  });

  const data: IApiResponse<undefined> = await response.json();

  return data;
};

export const verifyEmail = async (values: OtpFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/confirm-email-verification`,
    {
      method: "POST",
      body: JSON.stringify({ email: values.email, code: values.code }),
      headers: {
        ...HEADERS.JSON,
      },
    },
  );

  const data: IApiResponse<undefined> = await response.json();

  return data;
};

export const register = async (values: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      ...HEADERS.JSON,
    },
  });

  const data: IApiResponse<RegisterResponse> = await response.json();

  return data;
};

export const forgotPassword = async (values: EmailFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    body: JSON.stringify({ email: values.email }),
    headers: {
      ...HEADERS.JSON,
    },
  });

  const data: IApiResponse<undefined> = await response.json();

  return data;
};

export const resetPassword = async (values: ResetPasswordFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      ...HEADERS.JSON,
    },
  });

  const data: IApiResponse<undefined> = await response.json();

  return data;
};
