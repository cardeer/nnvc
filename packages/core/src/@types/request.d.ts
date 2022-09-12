export interface IRequestMetadata {
  name: string;
  method: string;
  path: string;
  descriptor: PropertyDescriptor;
}

export type RequestParams = {
  [key: string]: string;
};

export type RequestQueries = {
  [key: string]: string;
};
