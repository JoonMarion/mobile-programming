import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [sexo, setSexo] = useState('');
    const [pesoIdeal, setPesoIdeal] = useState('');
    const [pesoIdealAjustado, setPesoIdealAjustado] = useState('');

    function calculate() {
        let pesoIdealValue = 0;
        let pesoIdealAjustadoValue = 0;

        if (sexo === 'M' || sexo === 'm') {
            pesoIdealValue = 52 + 0.75 * (altura - 152.4);
        } else if (sexo === 'F' || sexo === 'f') {
            pesoIdealValue = 52 + 0.67 * (altura - 152.4);
        }

        pesoIdealAjustadoValue = (peso - pesoIdealValue) * 0.25 + pesoIdealValue;

        setPesoIdeal(pesoIdealValue.toFixed(2));
        setPesoIdealAjustado(pesoIdealAjustadoValue.toFixed(2));

        setPeso('');
        setAltura('');
        setSexo('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.calculatorWrapper}>
                <Text style={styles.title}>Calculadora Peso Ideal</Text>
                <TextInput
                    placeholder="Peso (kg)"
                    keyboardType="numeric"
                    style={styles.input}
                    value={peso}
                    onChangeText={setPeso}
                />
                <TextInput
                    placeholder="Altura (cm)"
                    keyboardType="numeric"
                    style={styles.input}
                    value={altura}
                    onChangeText={setAltura}
                />
                <TextInput placeholder="Sexo (M/F)" style={styles.input} value={sexo} onChangeText={setSexo} />

                <TouchableOpacity style={styles.button} onPress={calculate}>
                    <Text style={styles.textButton}>Calcular</Text>
                </TouchableOpacity>

                <Text style={styles.resultText}>Peso Ideal: {pesoIdeal} kg</Text>
                <Text style={styles.resultText}>Peso Ideal Ajustado: {pesoIdealAjustado} kg</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181A1B',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    calculatorWrapper: {
        maxWidth: 400,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#2B2F31',
        borderRadius: 10,
        padding: 10,
        color: '#fff',
        fontSize: 23,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#41AEF4',
        borderRadius: 10,
        padding: 10,
    },
    textButton: {
        color: '#FFF',
        fontSize: 25,
        textAlign: 'center',
    },
    resultText: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
    },
});
