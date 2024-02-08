/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 frontend/public/metarial/1234.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/1234.gltf')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.225, -2.116, -0.733]} scale={0.153}>
        <primitive object={nodes.AllCenterBone} />
        <skinnedMesh geometry={nodes.body.geometry} material={materials['Material.001']} skeleton={nodes.body.skeleton} />
        <skinnedMesh geometry={nodes.left_arm.geometry} material={materials.face} skeleton={nodes.left_arm.skeleton} />
        <skinnedMesh geometry={nodes.leg.geometry} material={materials.face} skeleton={nodes.leg.skeleton} />
        <skinnedMesh geometry={nodes.right_arm.geometry} material={materials.face} skeleton={nodes.right_arm.skeleton} />
        <skinnedMesh geometry={nodes.Cube002.geometry} material={materials.haircolor} skeleton={nodes.Cube002.skeleton} />
        <skinnedMesh geometry={nodes.Cube002_1.geometry} material={materials.cap} skeleton={nodes.Cube002_1.skeleton} />
        <skinnedMesh geometry={nodes.Cube002_2.geometry} material={materials.headcap} skeleton={nodes.Cube002_2.skeleton} />
        <skinnedMesh geometry={nodes.Cube002_3.geometry} material={materials.eyeblow} skeleton={nodes.Cube002_3.skeleton} />
        <skinnedMesh geometry={nodes.Cube002_4.geometry} material={materials.mouse} skeleton={nodes.Cube002_4.skeleton} />
        <skinnedMesh geometry={nodes.Cube002_5.geometry} material={materials.eye} skeleton={nodes.Cube002_5.skeleton} />
        <skinnedMesh geometry={nodes.Cube002_6.geometry} material={materials.face} skeleton={nodes.Cube002_6.skeleton} />
      </group>
    </group>
  )
}

useGLTF.preload('/1234.gltf')
