import { RegisterForm } from "../../components/forms";

interface SearchParams {
  // Define the properties of the searchParams object
  email: string;
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { email } = searchParams;
  return <RegisterForm email={email} />;
}
