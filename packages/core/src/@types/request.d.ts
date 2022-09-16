export interface IRequestMetadata {
  name: string;
  method: string;
  path: string;
  descriptor: PropertyDescriptor;
}

export interface IRequestParam {
  name: string;
  index: number;
}

type ObjectMap = {
  [key: string]: string;
};

export type RequestParams = ObjectMap;

export type RequestQueries = ObjectMap;

export interface IRequestView {
  page: string;
}
