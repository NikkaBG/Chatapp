import React, {useContext, useState} from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, ScrollView, Platform, View} from 'react-native';

import FormInput from '../components/FormInput';
import FormBotton from '../components/FormBotton';
import SocialButton from '../components/SocialButton';
import Loading from '../components/Loading';
import {AuthContext} from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();

    const {login, googleLogin, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../assets/icon.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>Chat App</Text>
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setpassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormBotton
                buttonTitle="Sign In"
                onPress={() => login(email, password)}
            />
            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            {Platform.OS === 'android' ? (
                <View>
                    <SocialButton
                        buttonTitle="Sign in with Facebook"
                        btnType="facebook"
                        color="#4867aa"
                        backgroundColor="#e6eaf4"
                        onPress={() => {}}
                    />
                    <SocialButton
                        buttonTitle="Sign in with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => googleLogin}
                    />
                </View>
            ) : null}
            
            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>
                    Don't have an acount? Create here
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    },
});