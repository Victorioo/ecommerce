import Papa from "papaparse";
import { ProductTypes } from "@/components/product/types";
import axios from "axios";

import { revalidatePath } from "next/cache";

export const data = () => {
  return axios
    .get(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRyUYS4xO2hhc9YANOi3CrfKa4FW3c3lbzBPNtNC0o6w-784mwymsqvT75G54cLEHZr7w2wAvtlhZsT/pub?output=csv",
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
