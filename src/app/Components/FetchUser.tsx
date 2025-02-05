import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { UserTypes } from "../../../types/ComponentsTypes";
import { UsersProps } from "../../../types/ComponentsTypes";
const query = groq`*[_type == "user"]{
_id,
 name,
 email
}`;
export async function getServerSideProps() {
  const users: UserTypes[] = await client.fetch(query);

  return {
    props: { users },
  };
}
export default function Users({ users }: UsersProps) {
  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
