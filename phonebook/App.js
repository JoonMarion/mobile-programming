import React, { useState, useEffect } from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { StyleSheet, View, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import Phonebook from './components/Phonebook';

const Header = styled.View`
    height: 70px;
    width: 100%;
    background-color: #2c6bb2;
    align-items: center;
    justify-content: center;
`;

const Title = styled.Text`
    font-size: 24px;
    color: white;
    font-weight: bold;
`;

export default function App() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            const storedContacts = await AsyncStorage.getItem('contacts');
            if (storedContacts) {
                setContacts(JSON.parse(storedContacts));
            }
        } catch (error) {
            console.log('Error loading contacts:', error);
        }
    };

    const saveContacts = async () => {
        try {
            await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
        } catch (error) {
            console.log('Error saving contacts:', error);
        }
    };

    const addContact = () => {
        if (name.trim() === '' || phone.trim() === '') {
            alert('Preencha todos os campos!');
            return; // Retorna se algum campo estiver vazio
        }

        const formattedPhone = phone.replace(/\D/g, '');
        const newContact = `${name}: ${formattedPhone}`;
        setContacts([...contacts, newContact]);
        setName('');
        setPhone('');
    };

    useEffect(() => {
        saveContacts();
    }, [contacts]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#3889e0" />
            <Header>
                <Title>Agenda Telefônica</Title>
            </Header>
            <Phonebook />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
