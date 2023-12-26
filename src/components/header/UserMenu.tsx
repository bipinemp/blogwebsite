import { getServerSession } from "next-auth";
import { fetchUserDetails } from "../queries/queries";
import ActualUserMenu from "./ActualUserMenu";

const UserMenu = async () => {
  const session = await getServerSession();
  const userDetails = await fetchUserDetails(session?.user?.email || "");

  return (
    <ActualUserMenu
      id={userDetails?.userData?._id}
      email={session?.user?.email || ""}
      image={session?.user?.image || ""}
      name={session?.user?.name || ""}
    />
  );
};

export default UserMenu;
