import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useState } from 'react/cjs/react.development';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
  );
}