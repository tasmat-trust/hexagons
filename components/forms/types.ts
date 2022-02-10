import  {GraphQLClient}  from 'graphql-request';

type FormData = {
  text: string,
  textarea: string,
  email: string,
  username: string,
  name: string,
  groups: string,
}

export type HandlerArgs = {
  formData: FormData;
  gqlClient: GraphQLClient;
  moduleId: number;
};

type ErrorObject = {
  message: string;
};

export type ResponseObject = {
  error: ErrorObject;
  success: boolean;
};

