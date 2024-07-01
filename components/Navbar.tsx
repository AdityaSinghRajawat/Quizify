"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from 'next-auth/react';
import { Button } from "./ui/button";

interface Session {
    user: {
        image: string;
        id: string
    };
}

const Navbar: React.FC = () => {

    const { data: session } = useSession() as { data: Session | null };

    const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        setUpProviders();
    }, []);

    return (
        <nav className="w-full h-16 py-4 px-6 bg-transparent backdrop-blur-md flex justify-between items-center border-1 fixed top-0 left-0 right-0 z-10">
            <Link href='/' className="flex items-center gap-2">
                {/* <Image
                    src='/assets/images/PromptOasis.svg'
                    alt="Quizify Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                /> */}
                <p className="text-3xl font-semibold">Quizler</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-4">
                {session?.user ? (
                    <div className="flex items-center gap-4">
                        <Link href='/create-quiz' className="btn btn-primary">
                            Create Quiz
                        </Link>
                        <Button type="button" onClick={() => signOut()} className="btn btn-outline">
                            Sign Out
                        </Button>
                        <Link href={`/profile`}>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) : (
                    providers && Object.values(providers).map((provider) => (
                        <Button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="btn btn-primary"
                        >
                            Sign In
                        </Button>
                    ))
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex items-center relative">
                {session?.user ? (
                    <div className="flex items-center">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropDown((prev) => !prev)}
                        />
                        {toggleDropDown && (
                            <div className="absolute top-full mt-2 right-0 w-48 bg-transparent backdrop-blur-md border-1 shadow-md rounded-md p-4">
                                <Link href={`/profile`} className="block py-2 text-center" onClick={() => setToggleDropDown(false)}>
                                    My Profile
                                </Link>
                                <Link href='/create-quiz' className="block py-2 text-center" onClick={() => setToggleDropDown(false)}>
                                    Create Quiz
                                </Link>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropDown(false);
                                        signOut();
                                    }}
                                    className="mt-4 w-full btn btn-primary"
                                >
                                    Sign Out
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    providers && Object.values(providers).map((provider) => (
                        <Button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="btn btn-primary"
                        >
                            Sign In
                        </Button>
                    ))
                )}
            </div>
        </nav>
    );
}

export default Navbar;
