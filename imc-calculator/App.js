import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');

    function calculate() {
        const alt = altura / 100;
        const imc = peso / (alt * alt);
        const rounded = imc.toFixed(2);

        if (imc > 0 && imc < 18.5) {
            alert(`Seu IMC é ${rounded} e você está abaixo do peso.`);
        } else if (imc >= 18.5 && imc < 25) {
            alert(`Seu IMC é ${rounded} e você está com o peso normal.`);
        } else if (imc >= 25 && imc < 30) {
            alert(`Seu IMC é ${rounded} e você está com sobrepeso.`);
        } else if (imc >= 30 && imc < 35) {
            alert(`Seu IMC é ${rounded} e você está com obesidade grau 1.`);
        } else if (imc >= 35 && imc < 40) {
            alert(`Seu IMC é ${rounded} e você está com obesidade grau 2.`);
        } else if (imc >= 40) {
            alert(`Seu IMC é ${rounded} e você está com obesidade grau 3.`);
        }

        setPeso('');
        setAltura('');
    }

    return (
        <View style={style.container}>
            <View style={style.calculatorWrapper}>
                <Text style={style.title}>Calcule seu IMC</Text>
                <TextInput
                    placeholder="Peso (kg)"
                    keyboardType="numeric"
                    style={style.input}
                    value={peso} // valor dentro do componente
                    onChangeText={setPeso} // toda vez que o campo mudar ele é salvo
                />
                <TextInput
                    placeholder="Altura (cm)"
                    keyboardType="numeric"
                    style={style.input}
                    value={altura} // valor dentro do componente
                    onChangeText={setAltura} // toda vez que o campo mudar ele é salvo
                />
                <TouchableOpacity style={style.button} onPress={calculate}>
                    <Text style={style.textButton}>Calcular</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
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
});
