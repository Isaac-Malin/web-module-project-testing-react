import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import Loading from '../Loading';

const showDataTest = {
  image: {medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/481/1202792.jpg', original: 'https://static.tvmaze.com/uploads/images/original_untouched/481/1202792.jpg'},
  name: 'Stranger Things',
  seasons: [
    {
      episodes: [],
      id: 0,
      name: 'Season 1'
    },
    {
      episodes: [],
      id: 1,
      name: 'Season 2'
    },
    {
      episodes: [],
      id: 2,
      name: 'Season 3'
    }
  ],
  summary: 'test show data'
}

test('renders without errors', () => { 
  render(<Show />)
});

test('renders Loading component when prop show is null', () => { 
  render(<Show show={null}/>)
  const loading = screen.queryByTestId('loading-container')
  expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => { 
  render(<Show show={showDataTest} selectedSeason={"none"}/>)
  const options = screen.queryAllByTestId(/season-option/i)
  expect(options).toHaveLength(3)
});

test('handleSelect is called when an season is selected', () => {
  const handleSelect = jest.fn();
  render(<Show show={showDataTest} selectedSeason={"none"} handleSelect={handleSelect} />);
  const select = screen.getByLabelText(/Select A Season/i);
  userEvent.selectOptions(select, ['1']);
  
  expect(handleSelect).toBeTruthy()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
  const { rerender } = render(<Show show={showDataTest} selectedSeason={"none"}/>)
  let episodes = screen.queryByTestId(/episodes-container/i)
  expect(episodes).not.toBeInTheDocument()

  rerender(<Show show={showDataTest} selectedSeason={'1'}/>)
  episodes = screen.queryByTestId(/episodes-container/i);
  expect(episodes).toBeInTheDocument()
});
