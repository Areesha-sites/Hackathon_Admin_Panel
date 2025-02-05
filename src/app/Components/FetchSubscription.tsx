import { client } from "@/sanity/lib/client";
const query = `*[_type == "subscription"] {
  name,
  email,
  plan,
  status,
  startDate,
  renewalDate,
  billingAddress,
  paymentMethod,
  transactionId,
  history
}`;

client.fetch(query).then((subscriptions) => {
  console.log(subscriptions); 
});