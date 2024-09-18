import { auth, signOut } from "@/auth";

async function Protect() {
  const session = await auth();
  return (
    <div>
      <p>protected page</p>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}

export default Protect;
