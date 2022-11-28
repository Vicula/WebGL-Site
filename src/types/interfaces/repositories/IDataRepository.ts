export interface IDataRepository {
  get(): Promise<Record<string, any>>;
}
