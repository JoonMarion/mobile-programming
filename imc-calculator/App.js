import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
    const [peso, setPeso] = useState(''); // Armazena o valor do peso
    const [altura, setAltura] = useState(''); // Armazena o valor da altura
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
                <TouchableOpacity style={style.button}>
                    <Text style={style.textoButton}>Calcular</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    calculatorWrapper: {
        maxWidth: 400,
    },
    title: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#DDD',
        borderRadius: 10,
        margin: 15,
        padding: 10,
        color: '#000',
        fontSize: 23,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#41AEF4',
        borderRadius: 10,
        margin: 15,
        padding: 10,
    },
    textoButton: {
        color: '#FFF',
        fontSize: 25,
        textAlign: 'center',
    },
});
