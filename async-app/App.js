import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

const BASE_URL = 'https://economia.awesomeapi.com.br/last/';

const ConversorDeMoedas = () => {
    const [usdRate, setUsdRate] = useState('');
    const [eurRate, setEurRate] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [convertedToUSD, setConvertedToUSD] = useState('');
    const [convertedToEUR, setConvertedToEUR] = useState('');

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
        const converted = parseFloat(inputValue) / usdRate;
        setConvertedToUSD(converted.toFixed(2));
        setConvertedToEUR('');
    };

    const convertToEUR = () => {
        const converted = parseFloat(inputValue) / eurRate;
        setConvertedToEUR(converted.toFixed(2));
        setConvertedToUSD('');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Conversor de Moedas do(a) Aluno(a)</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o valor em reais"
                onChangeText={(value) => setInputValue(value)}
                keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
                <Button title="Converter para Dólar" onPress={convertToUSD} color="white" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Converter para Euro" onPress={convertToEUR} color="white" />
            </View>
            {convertedToUSD > 0 && <Text style={styles.resultText}>Valor convertido para Dólar: {convertedToUSD}</Text>}
            {convertedToEUR > 0 && <Text style={styles.resultText}>Valor convertido para Euro: {convertedToEUR}</Text>}
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
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    resultText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default ConversorDeMoedas;
