import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';
import { getAddressByCep } from './src/services/api';

const App = () => {
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState({});

    const cepInputRef = useRef(null);

    const handleSearch = async () => {
        if (cep === '') {
            alert('Erro: Digite um cep válido!');
            return;
        }

        try {
            const data = await getAddressByCep(cep);
            setAddress(data);
            Keyboard.dismiss();
        } catch (error) {
            setAddress({});
            alert('Erro: Digite um cep válido!');
        }
    };

    const handleClear = () => {
        setCep('');
        setAddress({});
        cepInputRef.current.focus();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Buscador de CEP</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o CEP"
                onChangeText={(text) => setCep(text)}
                value={cep}
                keyboardType="numeric"
                ref={cepInputRef}
            />
            <View style={styles.areaBtn}>
                <TouchableOpacity style={styles.botao} onPress={handleSearch}>
                    <Text style={styles.botaoText}>Buscar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botao, styles.clearBtn]} onPress={handleClear}>
                    <Text style={styles.botaoText}>Limpar</Text>
                </TouchableOpacity>
            </View>
            {address.logradouro ? (
                <View style={styles.resultado}>
                    <Text style={styles.itemText}>CEP: {address.cep}</Text>
                    <Text style={styles.itemText}>Logradouro: {address.logradouro}</Text>
                    <Text style={styles.itemText}>Bairro: {address.bairro}</Text>
                    <Text style={styles.itemText}>Cidade: {address.localidade}</Text>
                    <Text style={styles.itemText}>Estado: {address.uf}</Text>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        marginTop: 25,
        marginBottom: 15,
        fontSize: 25,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        width: '90%',
        padding: 10,
        fontSize: 18,
    },
    areaBtn: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-around',
        gap: 20,
    },
    botao: {
        backgroundColor: '#2196F3',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
    },
    clearBtn: {
        backgroundColor: '#FF0000',
    },
    botaoText: {
        fontSize: 18,
        color: '#FFF',
    },
    resultado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 22,
    },
});

export default App;
