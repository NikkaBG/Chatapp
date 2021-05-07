import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

export default function AppStack () {
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2e64e5',
                },
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen 
                name="Home"
                component={HomeScreen} 
                options={{title: 'Chatrooms'}} 
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={({route}) => ({
                    title: route.params.name
                })}
            />
        </Stack.Navigator>
    )
}