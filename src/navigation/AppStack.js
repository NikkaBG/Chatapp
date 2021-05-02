import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

export default function AppStack () {
    return(
        <Stack.Navigator initialRouteName="Login" headerMode="none">
            <Stack.Screen 
            name="Home"
            component={HomeScreen} 
            options={{header: () => null}} 
            />
        </Stack.Navigator>
    )
}