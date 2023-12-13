import { proxy } from "valtio";


// this is like the global state which you can manage from anywhere
const state = proxy({
    intro:true,
    color:'#7CB9E8',
    isLogoTexture:true,
    isFullTexture:false,
    logoDecal : './iit.png',
    fullDecal : './threejs.png',
    x:0, //0.01
    y:0.05, //0.01
    scale : 0.15, //0.05
    rotate: 0.1 
});

export default state;