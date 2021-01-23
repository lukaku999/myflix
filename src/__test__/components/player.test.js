import React from 'react';
import {render, fireEvent} from '@testing-library/react'
import {Player} from '../../components/player/index'

describe('<Player/>', () => {
    it('render the <Player/> wth a bunny video', () => {

        const {container, getByText, queryByTestId} = render(
            <Player>
                <Player.Button />
                <Player.Video src="/videos/bunny.mp4"/>
            </Player>
        )
        console.log(container)
        expect(queryByTestId('player')).toBeFalsy()
        fireEvent.click(getByText('Play'))

        expect(queryByTestId('player')).toBeTruthy()
        fireEvent.click(queryByTestId('Play'))

        expect(queryByTestId('player')).toBeFalsy()
        expect(container.firstChild).toMatchSnapshot()
    })
})