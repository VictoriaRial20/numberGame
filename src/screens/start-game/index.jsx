import { Alert, Button, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Card, NumberContainer } from '../../components';
import React, { useState } from "react";

import { colors } from '../../constants';
import { styles } from './styles';

const StartGame = ({ onHandlerStartGame }) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(null);

    const onHandlerChange = (text) => {
        setEnteredValue(text.replace(/[^0-9]/g, ""));
    };

    const onHandleReset = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const onHandleConfirm = () => {
        const chosenNumber = parseInt(enteredValue, 10);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Número inválido', 'El número tiene que estar entre 0 y 99',
                [{ text: 'Entendido', style: 'destructive', onPress: onHandleReset }]);
        } else {
            setConfirmed(true);
            setSelectedNumber(chosenNumber);
            setEnteredValue("");
        }
    };

    const onHandleStartGame = () => {
        onHandlerStartGame(selectedNumber);
    };

    const Confirmed = () => confirmed ? (
        <Card style={styles.confirmedContainer}>
            <Text style={styles.confirmedTitle}>Número Seleccionado</Text>
            <NumberContainer number={selectedNumber} />
            <Button
                title='Iniciar Juego'
                onPress={onHandleStartGame}
                color={colors.primary}
            />
        </Card>
    ) : null;
    return (
        <KeyboardAvoidingView style={styles.containerScroll} behavior={Platform.OS === 'ios' ? 'height' : 'padding'}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}>
                <ScrollView style={styles.containerScroll}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Start Game</Text>
                        <Card style={styles.inputContainer}>
                            <Text style={styles.label}>Write number</Text>
                            <TextInput
                                onChangeText={onHandlerChange}
                                style={styles.input}
                                keyboardType="numeric"
                                placeholder='0'
                                value={enteredValue}
                                maxLength={2}
                            >
                            </TextInput>
                            <View style={styles.buttonContainer}>
                                <Button
                                    title='restart'
                                    onPress={onHandleReset}
                                    color={colors.secondary}
                                />
                                <Button
                                    title='confirm'
                                    onPress={onHandleConfirm}
                                    color={colors.primary}
                                />
                            </View>
                        </Card>
                        <Confirmed />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
export default StartGame; 