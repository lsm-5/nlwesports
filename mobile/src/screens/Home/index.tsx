import {useState, useEffect} from 'react'
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerURL}: GameCardProps){
    navigation.navigate('game', { id, title, bannerURL })
  }

  useEffect(() => {
    fetch("http://10.0.0.78:3333/games")
    .then(response => response.json())
    .then(data => setGames(data));
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={LogoImg}
          style={styles.logo}  
        />
        <Heading 
          title="Encontre seu duo!"
          subtitle="Selecione o game que você deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={ ({item}) => (
            <GameCard
            data={item}
            onPress={() => handleOpenGame(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}