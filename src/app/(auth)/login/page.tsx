import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H1 className="mb-5 text-center">Log In</H1>

      <AuthForm type="logIn"/>

      <p className="mt-6 text-sm text-zinc-500">
        Don&apos;t have an account?{"  "}
        <Link href={"/signup"}  className="text-base font-semibold text-blue-400 ">
          SignUp
        </Link>
      </p>

    </main>
  )
}
