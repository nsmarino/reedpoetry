import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Poem from './Poem'

test('renders content', () => {
  const poem = {
    title: 'I',
    content: [
        {
          line:'Component testing is done with react-testing-library',
          author: 'Elizabeth Bishop',
          _id: '436735985690873245'
        }
    ],
    archived: false
  }

  const component = render(
    <Poem poem={poem} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})