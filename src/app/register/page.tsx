import { RegisterForm } from "../../components/forms";

export default function RegisterPage({ searchParams }) {
    const { email } = searchParams;
    return <RegisterForm email={email} />;
}
