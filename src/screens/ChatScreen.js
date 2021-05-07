import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {AuthContext} from '../navigation/AuthProvider';
import {firebase} from '../firebase';
import Loading from '../components/Loading';

const ChatScreen = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const {loading, user} = useContext(AuthContext);
    const db = firebase.firestore();
    const roomRef = db.collection('Rooms');
    const { thread } = route.params;

    useEffect(() => {
        const unsubscribe = roomRef
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        name: '',
                        latestMessage: { text: '' },
                        ...documentSnapshot.data()
                    }
                })
                setMessages(messages)
                console.log(messages)
                if (loading) {
                    setLoading(false)
                }
            })
        return () => unsubscribe()
    }, []);


    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
        const {
            _id,
            createdAt,
            text,
            user
        } = messages[0]
        roomRef.doc(thread._id)
        collection('messages')
        add({
            _id,
            createdAt,
            text,
            user
        })
    }, []);

    const renderSend = (props) => {
        return (
        <Send {...props}>
            <View>
                <MaterialCommunityIcons
                    name="send-circle"
                    style={{marginBottom: 5, marginRight: 5}}
                    size={32}
                    color="#2e64e5"
                />
            </View>
        </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return(
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            handleSend
            user={{
                _id: user.uid,
                name: user.email,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
        />
    );
};
export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});