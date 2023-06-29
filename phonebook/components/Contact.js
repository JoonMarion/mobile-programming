import React from 'react';
import styled from 'styled-components/native';

const ContactContainer = styled.View`
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #cccccc;
    align-self: stretch;
    padding: 10px;
    justify-content: center;
`;

const ContactName = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

const ContactNumber = styled.Text`
    font-size: 14px;
    color: #999999;
`;

const Delete = styled.TouchableOpacity`
    position: absolute;
    right: 10px;
    top: 10px;
`;

const DeleteText = styled.Text`
    margin-top: 10px;
    color: #ff0000;
`;

const Contact = ({ name, number, onPress }) => (
    <ContactContainer>
        <ContactName>{name}</ContactName>
        <ContactNumber>{number}</ContactNumber>
        <Delete onPress={onPress}>
            <DeleteText>Excluir</DeleteText>
        </Delete>
    </ContactContainer>
);

export default Contact;
