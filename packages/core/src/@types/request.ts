import { IncomingHttpHeaders } from 'http'

export interface IRequestMetadata {
  name: string
  method: string
  path: string
  descriptor: PropertyDescriptor
}

export interface IRequestParam {
  name: string
  index: number
}

export interface IRequestHeaderParam {
  property: keyof IncomingHttpHeaders
  index: number
}

type ObjectMap = {
  [key: string]: string
}

export type RequestParams = ObjectMap

export type RequestQueries = ObjectMap

export interface IRequestView {
  page: string
}

export type RequestHeaders = {
  [K in keyof IncomingHttpHeaders as string extends K
    ? never
    : number extends K
    ? never
    : K]: IncomingHttpHeaders[K]
}
