import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import DrinkWater from './assets/drink-water.png';

export default function App() {
    const [consumoAgua, setConsumoAgua] = useState(0);

    const addWater = (ml) => {
        const novoConsumo = consumoAgua + ml;
        setConsumoAgua(novoConsumo);
    };

    return (
        <Page>
            <StatusBar backgroundColor="#3889e0" />
            <PageWrapper>
                <Title>Água é Saúde</Title>
                <CustomImage source={DrinkWater} resizeMode="contain" />
                <Info>
                    <InfoText>Clique no botão abaixo de acordo com a quantidade de ml consumida</InfoText>
                </Info>
                <ButtonsWrapper>
                    <OptionButton onPress={() => addWater(200)}>
                        <OptionButtonText>200 ml</OptionButtonText>
                    </OptionButton>
                    <OptionButton onPress={() => addWater(300)}>
                        <OptionButtonText>300 ml</OptionButtonText>
                    </OptionButton>
                    <OptionButton onPress={() => addWater(500)}>
                        <OptionButtonText>500 ml</OptionButtonText>
                    </OptionButton>
                </ButtonsWrapper>

                <ConsumoText>Consumo: {consumoAgua} ml</ConsumoText>

                <AutorName>Autor(a): João Mariano</AutorName>
            </PageWrapper>
        </Page>
    );
}

const Page = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
`;

const PageWrapper = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 24px;
    width: 100%;
    height: 70px;

    font-weight: bold;
    color: white;

    background-color: #2c6bb2;
    text-align: center;

    padding-top: 20px;
`;

const CustomImage = styled.Image`
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 300px;
`;

const Info = styled.View`
    width: 90%;
    height: auto;
    max-width: 400px;
    max-height: 300px;
`;

const InfoText = styled.Text`
    font-size: 20px;
    width: 100%;
    height: 50px;
    text-align: center;
`;

const ConsumoText = styled.Text`
    font-size: 25px;
    width: 100%;
    height: 50px;
    text-align: center;
`;

const ButtonsWrapper = styled.View`
    width: 400px;
    height: 80px;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 30px;
`;

const OptionButton = styled.TouchableOpacity`
    width: 100px;
    height: 50px;
    background-color: #2c6bb2;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const OptionButtonText = styled.Text`
    font-size: 20px;
    color: white;
`;

const AutorName = styled.Text`
    font-size: 20px;
    width: 100%;
    height: 50px;
    font-weight: bold;
    text-align: center;
`;
