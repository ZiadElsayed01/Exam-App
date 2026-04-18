"use server";

import { ApiResponse } from "@/shared/types/api";
import {
  LoginResponse,
  LoginCredentials,
  RegisterResponse,
  SendEmailVerificationResponse,
  VerifyEmailResponse,
} from "../types/auth";
import { HEADERS } from "@/shared/constants/api-headers.constants";
import {
  EmailFormData,
  OtpFormData,
  RegisterFormData,
} from "../schemas/register.schma";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (credentials: LoginCredentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      ...HEADERS.JSON,
    },
  });

  const data: ApiResponse<LoginResponse> = await response.json();

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

  const data: ApiResponse<SendEmailVerificationResponse> =
    await response.json();

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

  const data: ApiResponse<VerifyEmailResponse> = await response.json();

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

  const data: ApiResponse<RegisterResponse> = await response.json();

  return data;
};
