import Cookies from 'js-cookie';

export async function getUserContext() {
    const cookiStore = await Cookies();

    const firstName = cookiStore.get("first_name")?.value || "";
    const lastName = cookiStore.get("last_name")?.value || "";
    const email = cookiStore.get("email")?.value || "";
    const role = cookiStore.get("role_id")?.value || "";
  return {
    firstName: firstName,
    lastName: lastName,
    name:`${firstName} ${lastName}`.trim(),
    email:email,
    role:role
  };
}
