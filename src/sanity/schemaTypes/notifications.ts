export default {
  name: "notifications",
  type: "document",
  title: "Notifications",
  fields: [
    {
      name: "message",
      type: "string",
      title: "Message",
    },
    {
      name: "createdAt",
      type: "datetime",
      title: "Created At",
      options: { default: new Date().toISOString() },
    },
  ],
};
