import React, { useState, useEffect } from 'react';
import { AsyncStorage, ScrollView, Alert } from 'react-native';
import styled from 'styled-components/native';
import maskPhoneNumber from './maskPhoneNumber';
import Contact from './Contact';

const Container = styled.View`
    flex: 1;
    padding: 20px;
    align-items: center;
`;

const Input = styled.TextInput`
    height: 40px;
    width: 90%;
    min-width: 200px;
    border: none;
    background-color: #f2f2f2;
    border-radius: 4px;
    padding: 10px;
`;

const AddButtonWrapper = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
`;

const AddButton = styled.TouchableOpacity`
    background-color: #007bff;
    border-radius: 4px;
    padding: 10px;
    width: 90%;
    align-items: center;
`;

const AddButtonText = styled.Text`
    color: #ffffff;
    font-weight: bold;
    font-size: 16px;
`;

const EmptyWrapper = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const EmptyMessage = styled.Text`
    font-size: 18px;
    color: #999999;
    margin-top: 20px;
`;

const Phonebook = () => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);

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
        if (!name.trim()) {
            alert('Preencha o nome!');
            return;
        } else if (!phone.trim()) {
            alert('Preencha o telefone!');
            return;
        }

        const formattedPhone = phone.replace(/\D/g, '');
        const newContact = `${name}: ${formattedPhone}`;
        setContacts([...contacts, newContact]);
        setName('');
        setPhone('');
        setShowForm(false);
    };

    const deleteContact = (index) => {
        const updatedContacts = [...contacts];
        updatedContacts.splice(index, 1);
        setContacts(updatedContacts);
    };

    useEffect(() => {
        saveContacts();
    }, [contacts]);

    const showAddContactForm = () => {
        setShowForm(true);
    };

    const hideAddContactForm = () => {
        setShowForm(false);
    };

    const handleSearch = () => {
        const filtered = contacts.filter((contact) => {
            const [contactName] = contact.split(': ');
            return contactName.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredContacts(filtered);
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm, contacts]);

    return (
        <>
            {!showForm && (
                <AddButtonWrapper>
                    <AddButton onPress={showAddContactForm}>
                        <AddButtonText>Adicionar Contato</AddButtonText>
                    </AddButton>
                </AddButtonWrapper>
            )}
            {showForm && (
                <AddButtonWrapper>
                    <Input placeholder="Nome" value={name} onChangeText={setName} />
                    <Input
                        placeholder="Telefone"
                        value={maskPhoneNumber(phone)}
                        onChangeText={setPhone}
                        keyboardType="numeric"
                    />
                    <AddButton onPress={addContact}>
                        <AddButtonText>Adicionar</AddButtonText>
                    </AddButton>
                    <AddButton onPress={hideAddContactForm}>
                        <AddButtonText>Cancelar</AddButtonText>
                    </AddButton>
                </AddButtonWrapper>
            )}
            <AddButtonWrapper>
                <Input
                    placeholder="Buscar contato"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    style={{ marginTop: 20 }}
                />
            </AddButtonWrapper>
            {searchTerm !== '' && filteredContacts.length === 0 ? (
                <EmptyWrapper>
                    <EmptyMessage>Nenhum contato encontrado.</EmptyMessage>
                </EmptyWrapper>
            ) : (
                <ScrollView>
                    <Container>
                        {filteredContacts.map((contact, index) => {
                            const [contactName, contactNumber] = contact.split(': ');
                            return (
                                <Contact
                                    key={index}
                                    name={contactName}
                                    number={maskPhoneNumber(contactNumber)}
                                    onPress={() => deleteContact(index)}
                                />
                            );
                        })}
                    </Container>
                </ScrollView>
            )}
        </>
    );
};

export default Phonebook;
