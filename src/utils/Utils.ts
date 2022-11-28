import axios, { AxiosError } from "axios";

export abstract class Utils {
  public static sleep(delay: number) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  public static isAxiosError<TResponseType>(
    error: unknown
  ): error is AxiosError<TResponseType> {
    return axios.isAxiosError(error);
  }

  public static formatStyleUnit(val: string) {
    const n = parseFloat(val) ?? 50,
      p = val.match(/%|em/);
    return isNaN(n) ? "50px" : p ? n + p[0] : Math.round(n) + "px";
  }
}

export default Utils;
