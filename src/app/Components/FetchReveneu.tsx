import { createClient } from "next-sanity";
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
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