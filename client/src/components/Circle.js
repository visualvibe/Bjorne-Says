import React from 'react'
import { ROUND_STATE, DIFFICULTY } from '../custom/util';

const Circle = ({ difficulty, currentCircle, activeLevel, circles, activeCircle, handleClick, roundState}) =>{
    const circleList = circles.map((circle, i) =>{
        return(
            
            <button 
                id='animate' 
                style={{animationPlayState: currentCircle === activeLevel+1  ? 
                  'paused' 
                : 
                  (activeCircle === circle.id && roundState === ROUND_STATE.SHOWING) ? 
                  'running' 
                : 
                  'paused',
                cursor: roundState === ROUND_STATE.PLAYABLE ?
                  'pointer'
                :
                  'not-allowed',
                animationDuration: difficulty == DIFFICULTY.EASY ? 
                  '1.6s'
                :
                  difficulty == DIFFICULTY.MEDIUM ? 
                  '.8s'
                : difficulty == DIFFICULTY.HARD ? 
                  '.2s'
                :
                  ''}} 
                className={'circle ' + circle.color} key={circle.id} 
                onClick={roundState === ROUND_STATE.PLAYABLE ? (e) =>{handleClick(e, circle.id)} : ''}>
            </button>
        )
    })

    return(
        <>
        {circleList}
        </>
    )
}

export default Circle