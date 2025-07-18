import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./Firebase";
import axiosPublic from "../AxiosPublic";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const AxiosPublic = axiosPublic;
    const provider = new GoogleAuthProvider()
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const signIn = async (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                return result;
            })
            .catch(error => {
                console.error('Sign-in error:', error);
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserInfo = (name, imgUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imgUrl
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && currentUser.email) {
                const userInfo = { email: currentUser.email };
                AxiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            console.log('Token received:', res.data.token);
                            localStorage.setItem('access-token', res.data.token);
                        }
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error('JWT token request failed:', err);
                        setLoading(false);
                    });
            } else {
                localStorage.removeItem('access-token');
                setUser(null);
                setLoading(false);
            }

            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [AxiosPublic]);


    const authInfo = { user, googleSignIn, logOut, signIn, isLoading, updateUserInfo, createUser }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;