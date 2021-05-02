import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { firebase } from '../firebase';

import Loading from '../components/Loading';

import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function Routes() {
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
    const [loading, setLoading] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (loading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}