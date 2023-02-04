import { Alert, Button, Text, View } from "react-native";
import { Card, NumberContainer } from "../../components";
import React, {useEffect, useRef, useState} from "react";

import { colors } from "../../constants";
import { styles } from "./styles";

const generateRandomNumber = (min, max, exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber  = Math.floor(Math.random() * (max-min) + min);
    if (randomNumber === exclude ){
        return generateRandomNumber(min, max, exclude)
    }else {
        return randomNumber;
    }
}
const Game = ({selectedNumber, onHanleGameOver}) => {
    const [currentGuest, setCurrentGuest] = useState(generateRandomNumber(1,100,selectedNumber))
    const [rounds, setRounds] = useState(0);
    
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if(currentGuest === selectedNumber) onHanleGameOver(rounds);
    }, [currentGuest, selectedNumber, onHanleGameOver]);
    
    const onHandleNextGuess = (direction) => {
        if (
            direction === 'lower' && currentGuest < selectedNumber || 
            direction === 'greater' && currentGuest > selectedNumber
        ){
            Alert.alert("No mientas", "Sabes que eso es incorrecto", 
            [{text: "Perdon!", style: "cancel" }, ]);
            return;
        }

        if( direction === "lower") {
            currentHigh.current = currentGuest;
        } else{
            currentLow.current = currentGuest;
        }

        const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuest);

        setCurrentGuest(nextNumber);
        setRounds((rounds) => rounds + 1);
    };
    return (
        <View style={styles.container}>
            <Card style={styles.content}>
                <Text style={styles.title}> Número del oponente</Text>
                <NumberContainer number={currentGuest} />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Menor"
                        onPress={()=>onHandleNextGuess('lower')}
                        color={colors.primary} />

                    <Button
                        title="Mayor"
                        onPress={()=>onHandleNextGuess('greater')}
                        color={colors.primary} />
                </View>
            </Card>
        </View>
    )
};

export default Game;