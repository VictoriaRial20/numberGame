import { ActivityIndicator, View } from "react-native";
import { Game, GameOver, StartGame } from "./screens";

import { Header } from "./components/index";
import { styles } from "./styles";
import { useFonts } from 'expo-font';
import { useState } from "react";

const App = () => {
  const [loaded] = useFonts({
    'Karma-Regular': require('../assets/fonts/Karma-Regular.ttf'),
    'Karma-Bold': require('../assets/fonts/Karma-Bold.ttf'),
    'Karma-Medium': require('../assets/fonts/Karma-Medium.ttf'),
    'Karma-Light': require('../assets/fonts/Karma-Light.ttf'),
    'Karma-SemiBold': require('../assets/fonts/Karma-SemiBold.ttf'),
  });
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);
  const onHandlerStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
   
  const onHanleGameOver =(rounds) => {
    setGuessRounds(rounds);
  }

  const onHandleRestartGame = ( )=> {
    setUserNumber(null);
    setGuessRounds(0);
  };
  const Content = () => {
    if (userNumber && guessRounds <= 0){
      return <Game selectedNumber={userNumber} onHanleGameOver={onHanleGameOver} /> ;
    }
    if (guessRounds > 0) {
      return <GameOver onHandleRestartGame={onHandleRestartGame} rounds={guessRounds} selectedNumber={userNumber}/>;
    }
    return  <StartGame onHandlerStartGame={onHandlerStartGame}/>;
  };

  if (!loaded) {
    return(
      <View style={styles.containerloader}>
       <ActivityIndicator size="large" color='#97A1D8'/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Header title="Adivina el número" />
      <Content />

    </View>
  );
};

export default App;
