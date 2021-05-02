import React from 'react';
import { useContext } from 'react';
import {Text, View, StyleSheet} from 'react-native';

import FormBotton from '../components/FormBotton';
import {AuthContext} from '../navigation/AuthProvider';

const HomeScreen = () => {
    const {user, logout} = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Welcome {user.fname}
            </Text>
            <FormBotton 
                buttonTitle="Logout"
                onPress={() => logout()}
            />
        </View>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
});