import { useEffect, useRef } from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const shirtRef = useRef();

  useEffect(() => {
    if (shirtRef.current) {
      shirtRef.current.rotation.y = snap.rotate; // Rotate the shirt by 180 degrees
    }
  }); // Empty dependency array to run only once

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh ref={shirtRef} castShadow
            geometry={nodes.T_Shirt_male.geometry}
            material={materials.lambert1}
            material-roughness={1}
            dispose={null}>
        {/* Decals */}
        {snap.isFullTexture && (
          <Decal position={[0, 0, 0]}
                 rotation={[0, 0, 0]}
                 scale={1}
                 map={fullTexture} />
        )}
        {snap.isLogoTexture && (
          <Decal position={[snap.x, snap.y, 0.15]}
                 rotation={[0, 0, 0]}
                 scale={snap.scale}
                 map={logoTexture}
                 anisotropy={16}
                 depthTest={false}
                 depthWrite={true}
                 shininess={100} />
        )}
      </mesh>
    </group>
  );
}

export default Shirt;
