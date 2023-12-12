import { proxy } from "valtio";


// this is like the global state which you can manage from anywhere
const state = proxy({
    intro:true,
    color:'#EFBD48',
    isLogoTexture:true,
    isFullTexture:false,
    logoDecal : './threejs.png',
    fullDecal : './threejs.png'
});

export default state;