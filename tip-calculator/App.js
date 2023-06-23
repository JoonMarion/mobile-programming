import React, { useState } from 'react';
import { TouchableOpacity, Text, View, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';

const Page = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    padding-top: 30px;
    background-color: #181a1b;
`;

const Container = styled.View`
    flex: 1;
    align-items: center;
    width: 500px;
`;

const HeaderText = styled.Text`
    font-size: 25px;
    margin: 30px;
    color: #fff;
`;

const Input = styled.TextInput.attrs({
    placeholderTextColor: 'white',
})`
    width: 90%;
    height: 50px;
    font-size: 18px;
    background-color: #2b2f31;
    color: #fff;
    margin: 20px 0;
    border-radius: 10px;
    padding: 10px;
`;

const ResultArea = styled.View`
    width: 450px;
    margin-top: 30px;
    background-color: #2b2f31;
    padding-top: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const ResultTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #fff;
`;

const ResultText = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    color: #fff;
`;

const DropdownButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: #dddddd;
    border-radius: 5px;
    margin-top: 10px;
`;

const DropdownButtonText = styled.Text`
    color: #000;
    font-size: 16px;
`;

const OptionButton = styled.TouchableOpacity`
    padding: 10px;
`;

const OptionButtonText = styled.Text`
    font-size: 16px;
    color: #000;
`;

export default () => {
    const [bill, setBill] = useState('');
    const [tip, setTip] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);
    const [selectedOptionText, setSelectedOptionText] = useState('Como foi o serviço?');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option, optionText) => {
        setSelectedOption(option);
        setSelectedOptionText(optionText);
        setIsOpen(false);
        calc(option);
    };

    const calc = (x) => {
        let nBill = parseFloat(bill);

        if (nBill) {
            setTip(nBill * x);
        } else {
            alert('Digite o valor da conta!');
        }
    };

    return (
        <Page>
            <Container>
                <HeaderText>Calculadora de Gorjeta</HeaderText>

                <Input
                    placeholder="Quanto deu a conta?"
                    keyboardType="numeric"
                    placeholderTextColor={'#000'}
                    value={bill}
                    onChangeText={(n) => setBill(n)}
                />

                <DropdownButton onPress={toggleDropdown}>
                    <DropdownButtonText>{selectedOptionText}</DropdownButtonText>
                </DropdownButton>

                {isOpen && (
                    <View style={{ marginTop: 10, backgroundColor: '#FFFFFF', borderRadius: 10 }}>
                        <OptionButton onPress={() => handleOptionSelect(0.05, 'Aceitável - 5%')}>
                            <OptionButtonText>Aceitável - 5%</OptionButtonText>
                        </OptionButton>
                        <OptionButton onPress={() => handleOptionSelect(0.1, 'Bom - 10%')}>
                            <OptionButtonText>Bom - 10%</OptionButtonText>
                        </OptionButton>
                        <OptionButton onPress={() => handleOptionSelect(0.15, 'Ótimo - 15%')}>
                            <OptionButtonText>Ótimo - 15%</OptionButtonText>
                        </OptionButton>
                        <OptionButton onPress={() => handleOptionSelect(0.2, 'Incrível - 20%')}>
                            <OptionButtonText>Incrível - 20%</OptionButtonText>
                        </OptionButton>
                    </View>
                )}

                {tip > 0 && (
                    <ResultArea>
                        <ResultTitle>Valor da Conta</ResultTitle>
                        <ResultText>R$ {parseFloat(bill).toFixed(2)}</ResultText>

                        <ResultTitle>Valor da Gorjeta</ResultTitle>
                        <ResultText>R$ {tip.toFixed(2)}</ResultText>

                        <ResultTitle>Valor Total</ResultTitle>
                        <ResultText>R$ {(parseFloat(bill) + tip).toFixed(2)}</ResultText>
                    </ResultArea>
                )}
            </Container>
        </Page>
    );
};
