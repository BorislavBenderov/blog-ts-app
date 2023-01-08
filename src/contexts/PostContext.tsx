import { collection, DocumentData, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { database } from "../firebaseConfig";

type ChildrenContextProviderProps = {
    children: React.ReactNode
}

export type PostContextType = {
    posts: IPost[];
}

export interface IPost {
    title?: string,
    description?: string,
    id?: string,
    imageUrl?: string,
    content?: string,
    ownerId?: string
}

export const PostContext = createContext<PostContextType | null>(null);

export const PostContextProvider = ({ children }: ChildrenContextProviderProps) => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const q = query(collection(database, 'posts'), orderBy("timestamp", 'desc'))
        onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
            setPosts(snapshot.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }));
            setIsLoading(true);
        });
    }, []);

    return (
        <PostContext.Provider value={{ posts }}>
            {children}
        </PostContext.Provider>
    );
}