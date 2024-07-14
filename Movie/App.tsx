import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import ActionBar from './components/ActionBar';
import MovieModal from './components/MovieModal';
import MovieItem from './components/MovieItem';

export interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/list/5?api_key=d4bc3c640586e7f90dc68d8b300247ff&language=en-US')
      .then(response => response.json())
      .then(data => setMovies(data.items))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMovie(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ActionBar />
      <ScrollView testID='movie-list'>
        <View style={styles.movieList}>
          {movies.map(movie => (
            <TouchableOpacity
              key={movie.id}
              onPress={() => openModal(movie)}
              activeOpacity={0.7}>
              <MovieItem movie={movie} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <MovieModal
        visible={modalVisible}
        movie={selectedMovie}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  movieList: {
    padding: 10,
  },
});

export default App;