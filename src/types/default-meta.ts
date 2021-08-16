export interface IDefaultMeta extends Record<string, any> {
  host: string;
  _tags: string;
}

export type DefaultMeta = IDefaultMeta;