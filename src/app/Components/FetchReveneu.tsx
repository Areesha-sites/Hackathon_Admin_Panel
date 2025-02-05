import { createClient } from "next-sanity";
export const client = createClient({
  projectId: "irig0aa7",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-10-01",
});
export async function getRevenueData() {
  const query = `*[_type == "revenue"] | order(date desc) {
    date,
    totalSales,
    totalRevenue
  }`;
  return await client.fetch(query);
}