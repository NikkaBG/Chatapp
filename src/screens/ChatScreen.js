import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ChatScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Chat screen</Text>
        </View>
    );
}
export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});