export interface ErrorMap {
  path?: string;
  message: string;
}

export interface FormError {
  status: "error";
  message: string;
  errors?: Array<ErrorMap>;
}

export interface FormSuccess {
  status: "success";
  message: string;
}

export type FormState = FormError | FormSuccess | null;
