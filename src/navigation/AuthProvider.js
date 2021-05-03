import React, {createContext, useState} from 'react';
import { firebase } from '../firebase';
import * as Google from 'expo-google-app-auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                login: async (email, password) => {
                    setLoading(true);
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                    }
                    setLoading(false);
                },

                googleLogin: async () => {
                    console.log("test")
                    setLoading(true);
                    try {
                        // Get the users ID token
                        console.log("test")
                        const { idToken } = await Google.logInAsync({
                            androidClientId: 448051884835
                        });
            
                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            
                        // Sign-in the user with the credential
                        await auth().signInWithCredential(googleCredential)
                        // Use it only when user Sign's up, 
                        // so create different social signup function
                        // .then(() => {
                        //   //Once the user creation has happened successfully, we can add the currentUser into firestore
                        //   //with the appropriate details.
                        //   // console.log('current User', auth().currentUser);
                        //   firestore().collection('users').doc(auth().currentUser.uid)
                        //   .set({
                        //       fname: '',
                        //       lname: '',
                        //       email: auth().currentUser.email,
                        //       createdAt: firestore.Timestamp.fromDate(new Date()),
                        //       userImg: null,
                        //   })
                        //   //ensure we catch any errors at this stage to advise us if something does go wrong
                        //   .catch(error => {
                        //       console.log('Something went wrong with added user to firestore: ', error);
                        //   })
                        // })
                        //we need to catch the whole sign up process if it fails too.
                        .catch(error => {
                            console.log('Something went wrong with sign up: ', error);
                        });
                    } catch(error) {
                      console.log({error});
                    }
                  },

                // Login with Facebook
                
                register: async (fName, email, password) => {
                    setLoading(true);
                    try {
                        await firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            //Once the user creation has happened successfully, we can add the currentUser into firestore
                            //with the appropriate details.
                            firestore().collection('users').doc(auth().currentUser.uid)
                            .set({
                                fname: fName,
                                lname: '',
                                email: email,
                                createdAt: firestore.Timestamp.fromDate(new Date()),
                                userImg: null,
                            })
                            //ensure we catch any errors at this stage to advise us if something does go wrong
                            .catch(error => {
                                console.log('Something went wrong with added user to firestore: ', error);
                            })
                        })
                        //we need to catch the whole sign up process if it fails too.
                        .catch(error => {
                            console.log('Something went wrong with sign up: ', error);
                        });
                    } catch (e) {
                        console.log(e);
                    }
                    setLoading(false);
                },

                logout: async () => {
                    try {
                        await firebase.auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};