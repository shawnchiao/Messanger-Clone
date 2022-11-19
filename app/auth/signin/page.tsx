import { getProviders, signIn } from "next-auth/react";
import SignInComponent from "./SignInComponent";
import Image from "next/image";

const SignInPage = async () => {
  const providers = await getProviders();
  return (
    <div className="grid justify-center">
      <div>
        <Image
          className="flex justify-center rounded-full mx-2 object-cover"
          width={700}
          height={700}
          src="https://links.papareact.com/161"
          alt="Profile Picture"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
};

export default SignInPage;
