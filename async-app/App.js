import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
    flex: 1;
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Contact = styled.Text`
    font-size: 18px;
    margin-bottom: 10px;
`;

const InputPhonebook = styled.TextInput`
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
`;

const Phonebook = () => {
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
        const newContact = `${name}: ${phone}`;
        setContacts([...contacts, newContact]);
        setName('');
        setPhone('');
    };

    useEffect(() => {
        saveContacts();
    }, [contacts]);

    return (
        <Container>
            <Title>Agenda Telefônica</Title>
            {contacts.map((contact, index) => (
                <Contact key={index}>{contact}</Contact>
            ))}
            <InputPhonebook placeholder="Nome" value={name} onChangeText={(text) => setName(text)} />
            <InputPhonebook placeholder="Telefone" value={phone} onChangeText={(text) => setPhone(text)} />
            <Button title="Adicionar Contato" onPress={addContact} />
        </Container>
    );
};

export default Phonebook;
