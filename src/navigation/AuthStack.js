import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    let routeName;

    return (        
        <Stack.Navigator initialRouteName="Login" headerMode="none">
            <Stack.Screen 
                name="Login"
                component={LoginScreen} 
                options={{header: () => null}} 
            />
            <Stack.Screen 
                name="Signup" 
                component={SignupScreen}
                options={({navigation}) => ({
                    title: '',
                    headerStyle: {
                        backgroundColor: '#f9fafd',
                        shadowColor: '#f9fafd',
                        elevation: 0,
                    },
                    headerLeft: () => (
                        <View style={{marginLeft: 10}}>
                            <FontAwesome.Button 
                                name="long-arrow-left"
                                size={25}
                                backgroundColor="#f9fafd"
                                color="#333"
                                onPress={() => navigation.navigate('Login')}
                            />
                        </View>
                    ),
                })}
            />
        </Stack.Navigator>
    );
}