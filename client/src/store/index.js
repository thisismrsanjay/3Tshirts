import { proxy } from "valtio";


// this is like the global state which you can manage from anywhere
const state = proxy({
    intro:true,
    color:'#7CB9E8',
    isLogoTexture:true,
    isFullTexture:false,
    logoDecal : './iit.png',
    fullDecal : './threejs.png'
});

export default state;