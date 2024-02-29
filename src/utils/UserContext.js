import { createContext } from "react";

const UserContext = createContext({
	user: { name: "Jack", email: "jack@example.com" },
});
export default UserContext;
UserContext.displayName = "UserContext";
