import React from 'react';
import { useContext, useEffect, useState } from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Loading from '../components/Loading';
import FormBotton from '../components/FormBotton';
import {AuthContext} from '../navigation/AuthProvider';

import {firebase} from '../firebase';

const HomeScreen = ({navigation}) => {
    const {user, logout, loading} = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);

    const db = firebase.firestore();

    useEffect(() => {
        const unsubscribe = db.collection('Rooms')
        // .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const rooms = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        // give defaults
                        name: '',
                        ...documentSnapshot.data()
                    };
                });
                setRooms(rooms);
                if (loading) {
                  setLoading(false);
                }
            });   
            /**
             * unsubscribe listener
             */
            return () => unsubscribe();
        }, []
    );

    if (loading) {
        return <Loading />;
    }

    const renderItem = ({ item }) => {
        const { description, name } = item;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Chat', { name: item.name })}>
                <View style={styles.card}>
                    <View style={styles.roomInfo}>
                        <View style={styles.roomInfoText}>
                            <Text style={styles.roomName}>
                                { name }
                            </Text>
                            <Text style={styles.roomDescription} numberOfLines={2}>
                                { description }
                            </Text>
                        </View>
                        <AntDesign name="right" size={50} color="#666" justifyContent="right" />
                    </View>
                </View>
            </TouchableOpacity>
        )
    };
    
    return (
        
        <View style={styles.container}>
            <FlatList
                data={rooms}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                />
            
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding : 20,
    },
    card: {
        backgroundColor: '#F0F0F0',
        width: windowWidth-40,
        marginBottom: 20,
        borderRadius: 10,
    },
    roomInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
    },
    roomInfoText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    roomName: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    roomDescription: {
        fontSize: 22,
        color: '#666',
    },
})