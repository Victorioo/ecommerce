//@ts-ignore
import Papa from "papaparse";
import { ProductTypes } from "@/components/product/types";
import axios from "axios";

import { revalidatePath } from "next/cache";

export const data = () => {
  return axios
    .get(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHP5gOb_sNvhE1t0yqOpmvERoKEGG6afVWWFYqeVq_OgsXVsuBqtjFlLvYZs72Sw60EuQrGN0S6uCJ/pub?output=csv",
      {
        responseType: "blob",
      }
    )
    .then((response) => {
      return new Promise<ProductTypes[]>((resolve, reject) => {
        const parsedCSV = Papa.parse(response.data, {
          header: true,
          //@ts-ignore
          complete: (results) => resolve(results.data as ProductTypes[]),
          //@ts-ignore
          error: (error) => reject(error.message),
        });
        return parsedCSV
      });
    });
};

export async function refreshData() {
  revalidatePath("/");
  return Response.json({ revalidated: true });
}
