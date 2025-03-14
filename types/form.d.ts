interface ErrorMap {
  path?: string;
  message: string;
}

interface FormError {
  status: "error";
  message: string;
  errors?: Array<ErrorMap>;
  result?: any;
}

interface FormSuccess {
  status: "success";
  message?: string;
  result?: any;
}
type FormState = FormError | FormSuccess | null;

type FormHandler = (state: FormState, formData: FormData) => Promise<FormState>;
