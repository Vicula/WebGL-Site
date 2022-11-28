import axios from "axios";
import type { IDataRepository } from "@/types";
import { JsonSerializer } from "typescript-json-serializer";
const defaultSerializer = new JsonSerializer();

export class DataRepository implements IDataRepository {
  public async get(): Promise<Record<string, any>> {
    let { data } = await axios.get(`url`);
    data = {
      test: "test",
      test2: "test",
      test3: "test",
      test4: "test",
      test5: "test",
      test6: "test",
    };
    return defaultSerializer.deserialize<any>(data, {});
  }
}
