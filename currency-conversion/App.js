import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

const BASE_URL = 'https://economia.awesomeapi.com.br/last/';

const ConversorDeMoedas = () => {
    const [usdRate, setUsdRate] = useState('');
    const [eurRate, setEurRate] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [convertedToUSD, setConvertedToUSD] = useState('');
    const [convertedToEUR, setConvertedToEUR] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        fetchExchangeRates();
    }, []);

    const fetchExchangeRates = async () => {
        try {
            const response = await axios.get(`${BASE_URL}USD-BRL,EUR-BRL`);
            const { bid: usdBid } = response.data.USDBRL;
            const { bid: eurBid } = response.data.EURBRL;
            setUsdRate(usdBid);
            setEurRate(eurBid);
        } catch (error) {
            console.log(error);
        }
    };

    const convertToUSD = () => {
        if (!inputValue || parseFloat(inputValue) === 0) {
            Alert.alert('Erro', 'Digite um valor válido em reais.');
            return;
        }

        const converted = parseFloat(inputValue) / usdRate;
        setConvertedToUSD(converted.toFixed(2));
    };

    const convertToEUR = () => {
        if (!inputValue || parseFloat(inputValue) === 0) {
            Alert.alert('Erro', 'Digite um valor válido em reais.');
            return;
        }

        const converted = parseFloat(inputValue) / eurRate;
        setConvertedToEUR(converted.toFixed(2));
    };

    const clearValues = () => {
        setInputValue('');
        setConvertedToUSD('');
        setConvertedToEUR('');
        inputRef.current.focus();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Conversor de Moedas do Joãozinho</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o valor em reais"
                onChangeText={(value) => setInputValue(value)}
                keyboardType="numeric"
                value={inputValue}
                ref={inputRef}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={convertToUSD}>
                <Text style={styles.buttonText}>Converter para Dólar</Text>
            </TouchableOpacity>
            {convertedToUSD > 0 && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Valor convertido para Dólar: ${convertedToUSD}</Text>
                </View>
            )}
            <TouchableOpacity style={styles.buttonContainer} onPress={convertToEUR}>
                <Text style={styles.buttonText}>Converter para Euro</Text>
            </TouchableOpacity>
            {convertedToEUR > 0 && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Valor convertido para Euro: €{convertedToEUR}</Text>
                </View>
            )}
            <TouchableOpacity style={styles.clearButton} onPress={clearValues}>
                <Text style={styles.clearButtonText}>Limpar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#4287f5',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        height: 40,
        backgroundColor: '#4287f5',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    resultContainer: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#4287f5',
        borderRadius: 5,
    },
    resultText: {
        fontSize: 16,
    },
    clearButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    clearButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ConversorDeMoedas;
