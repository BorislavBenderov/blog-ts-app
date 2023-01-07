import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';

interface authData {
    user: string
}

type AuthContextProviderProps = {
    children: React.ReactNode
}

interface authUser {}

export const AuthContext = createContext<authUser | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [loggedUser, setLoggedUser] = useState<authUser | null>([]);

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