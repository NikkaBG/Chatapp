import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, ScrollView, View, Platform} from 'react-native';

import FormInput from '../components/FormInput';
import FormBotton from '../components/FormBotton';
import SocialButton from '../components/SocialButton';
import Loading from '../components/Loading';
import {AuthContext} from '../navigation/AuthProvider';

const SignupScreen = () => {
    const [fName, setfName] = useState('');
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const { register, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>Create an account</Text>
            <FormInput
                labelValue={fName}
                onChangeText={(userfName) => setfName(userfName)}
                placeholderText="Your Name"
                iconType="user"
                autoCapitalize="words"
                autoCorrect={false}
            />
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
            <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                placeholderText="Confirm Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormBotton
                buttonTitle="Sign Up"
                onPress={() => register(fName, email, password)}
            />
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By registering, you confirm that you accept our{' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                    <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                        Terms of service
                    </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                    Privacy Policy
                </Text>
            </View>

            {Platform.OS === 'android' ? (
                <View>
                    <SocialButton
                        buttonTitle="Sign Up with Facebook"
                        btnType="facebook"
                        color="#4867aa"
                        backgroundColor="#e6eaf4"
                        onPress={() => {}}
                    />
                    <SocialButton
                        buttonTitle="Sign Up with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => {}}
                    />
                </View>
            ) : null}

            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>
                    Have an accaunt? Sign In
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        color: 'grey',
    },
});