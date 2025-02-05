export default {
  name: "subscription",
  type: "document",
  title: "Subscription",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Subscriber Name",
    },
    {
      name: "email",
      type: "string",
      title: "Subscriber Email",
    },
    {
      name: "plan",
      type: "string",
      title: "Subscription Plan",
      options: {
        list: [
          { title: "Monthly", value: "monthly" },
          { title: "Yearly", value: "yearly" },
        ],
      },
    },
    {
      name: "status",
      type: "string",
      title: "Subscription Status",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    },
    {
      name: "startDate",
      type: "datetime",
      title: "Subscription Start Date",
    },
    {
      name: "renewalDate",
      type: "datetime",
      title: "Renewal Date",
    },
    {
      name: "billingAddress",
      type: "string",
      title: "Billing Address",
    },
    {
      name: "paymentMethod",
      type: "string",
      title: "Payment Method",
    },
    {
      name: "transactionId",
      type: "string",
      title: "Transaction ID",
    },
    {
      name: "history",
      type: "array",
      title: "Subscription History",
      of: [{
        type: "object",
        fields: [
          { name: "status", type: "string", title: "Status" },
          { name: "date", type: "datetime", title: "Change Date" }
        ]
      }]
    }
  ],
};