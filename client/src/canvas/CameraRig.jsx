import React, { useRef } from 'react'

import {useFrame } from '@react-three/fiber'
import {useSnapshot} from 'valtio'
import {easing} from 'maath'
import state from '../store'

const CameraRig = ( {children }) => {
  const group = useRef();
  const snap  = useSnapshot(state);


  useFrame((state,delta) => {

    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    //initial position
    let targetPosition = [-0.4,0,2]

    if (snap.intro){
      if (isBreakpoint) targetPosition = [0,0,2]
      if (isMobile) targetPosition = [0,0.2,2.5]
    }else{
      if (isMobile) targetPosition = [0,0,2.5]
      else targetPosition = [0,0,2]
    }
    //set model camera position
    easing.dampE(state.camera.position,targetPosition,0.25,delta)

    easing.dampE(
      group.current.rotation,
      [-state.pointer.y,state.pointer.x,0],
      0.2,
      delta
    )
  })
  //rotation 
 

  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default CameraRig