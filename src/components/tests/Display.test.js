import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow'
jest.mock('./../../api/fetchShow')


const showDataTest = {
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

test('renders without errors with no props', async () => { 
  render(<Display />)
});

test('renders Show component when the button is clicked ', async () => { 
  mockFetchShow.mockResolvedValueOnce(showDataTest)

  render(<Display />)
  const button = screen.getByRole('button')
  userEvent.click(button)

  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId('season-option')
    expect(seasonOptions).toHaveLength(3)
  })
});

test('renders show season options matching your data when the button is clicked', async () => { 
  mockFetchShow.mockResolvedValueOnce(showDataTest)
  const displayFunc = jest.fn()

  render(<Display displayFunc={displayFunc}/>)
  const button = screen.getByRole('button')
  userEvent.click(button)

  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled()
  })
});
