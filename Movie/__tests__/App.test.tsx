import 'react-native';
import React from 'react';
import App from '../App';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import fetchMock from 'jest-fetch-mock';
import { beforeEach, it, expect } from '@jest/globals';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

it('fetch and display movie list', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    items: [
      {
        "backdrop_path": "/cyecB7godJ6kNHGONFjUyVN9OX5.jpg",
        "id": 1726,
        "title": "Iron Man",
        "original_title": "Iron Man",
        "overview": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
        "poster_path": "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          28,
          878,
          12
        ],
        "popularity": 106.431,
        "release_date": "2008-04-30",
        "video": false,
        "vote_average": 7.645,
        "vote_count": 25903
      },
      {
        "backdrop_path": "/xfBnQ4mgf1jYZsscJGJjr6ce0Ar.jpg",
        "id": 1724,
        "title": "The Incredible Hulk",
        "original_title": "The Incredible Hulk",
        "overview": "Scientist Bruce Banner scours the planet for an antidote to the unbridled force of rage within him: the Hulk. But when the military masterminds who dream of exploiting his powers force him back to civilization, he finds himself coming face to face with a new, deadly foe.",
        "poster_path": "/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          878,
          28,
          12
        ],
        "popularity": 124.268,
        "release_date": "2008-06-12",
        "video": false,
        "vote_average": 6.211,
        "vote_count": 11518
      },
    ],
  }));

  const { getByText, getByTestId } = render(<App />);

  await act(async () => {
    await waitFor(() => getByTestId('movie-list'));
  });

  expect(getByText('Iron Man')).toBeTruthy();
});

it('opens and closes the modal correctly', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    items: [
      {
        "backdrop_path": "/cyecB7godJ6kNHGONFjUyVN9OX5.jpg",
        "id": 1726,
        "title": "Iron Man",
        "original_title": "Iron Man",
        "overview": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
        "poster_path": "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
        "media_type": "movie",
        "adult": false,
        "original_language": "en",
        "genre_ids": [
          28,
          878,
          12
        ],
        "popularity": 106.431,
        "release_date": "2008-04-30",
        "video": false,
        "vote_average": 7.645,
        "vote_count": 25903
      },
    ],
  }));

  const { getByText, getByTestId, queryByText } = render(<App />);
  await waitFor(() => expect(getByTestId('movie-list')).toBeTruthy());

  const iron = getByText("Iron Man");
  expect(iron).toBeTruthy();

  fireEvent.press(iron);

  const modal = getByTestId('modal');
  expect(modal).toBeTruthy();

  fireEvent.press(getByText('Close'));

  await waitFor(() => expect(queryByText('Close')).toBeNull());
});