import React, { useState } from 'react'
import TotalScore from './TotalScore'
import NumberSelector from './NumberSelector'
import styled from 'styled-components'
import RoleDice from './RoleDice'
import { Button, OutlineButton } from '../styled/Button'
import Rules from './Rules'

export default function GamePlay() {
  const [selectedNumber,setSelectedNumber]=useState();
  const[currentDice,setCurrentDice] = useState(2);
  const[score,setScore]=useState(0)
  const[error,setError]=useState('');
  const[showrules,setShowRules]=useState()

  const generateRandomNumber = (min,max) =>{
    return Math.floor(Math.random() * (max-min) + min);
  }
 
  const roleDice = () =>{
    if(!selectedNumber) {
     return setError("Number select kar Bhai")
    }
    const randomNumber = generateRandomNumber(1,7);
    setCurrentDice((prev)=> randomNumber)

    if(selectedNumber === randomNumber){
      setScore((prev)=> prev+1)
    }else{
      setScore((prev)=> prev-2)
    }

    setSelectedNumber(undefined)
  };

  const resetScore = ()=>{
    setScore(0)
  }



  return (
    <MainContainer>
    <div className='top_section'>
    <TotalScore score={score}/>
    <NumberSelector
    setError={setError}
    selectedNumber={selectedNumber}
    setSelectedNumber={setSelectedNumber}
    error={error}/>
    </div>
    <RoleDice currentDice={currentDice}
    roleDice={roleDice}/>
    <div className="btns">
      <OutlineButton onClick={resetScore}>Reset</OutlineButton>
      <Button
      onClick={()=> setShowRules((prev)=>!prev)}
      >{
        showrules ? "hide" : "show"
        } Rules</Button>
    </div>

    {showrules && <Rules/>}
    </MainContainer>
  )
}

const MainContainer = styled.main`
padding-top:70px;


  .top_section{
    display: flex;
    justify-content: space-between;
    align-items: end;

  }

  .btns{
    margin-top: 40px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    gap: 10px;
    align-items:center;
  }
`;

