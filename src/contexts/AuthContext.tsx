import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';

interface authData {
    user: string
}

type AuthContextProviderProps = {
    children: React.ReactNode
}

export interface IAuth {
    loggedUser: authUser | null
}

interface authUser {
    uid: string,
    email: string
}

export const AuthContext = createContext<IAuth | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [loggedUser, setLoggedUser] = useState<any | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedUser(user);
            } else {
                setLoggedUser(null);
            }
        });

        return () => {
            unsub();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ loggedUser }}>
            {children}
        </AuthContext.Provider>
    );
}