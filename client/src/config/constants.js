import { swatch, fileIcon, ai, logoShirt, stylishShirt,rotate,rotate2, up,down,left,right,plus,minus } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
 
];

export const FilterTabs = [
  {
    name: "plus",
    icon: plus,
  },
  {
    name: "minus",
    icon: minus,
  },
  {
    name:"rotateleft",
    icon : rotate2
  },
  {
    name:"rotateright",
    icon : rotate
  },
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
 
  
];
export const MoveTabs = [
  {
    name: "up",
    icon: up,
  },
  {
    name: "down",
    icon: down,
  },
  {
    name: "left",
    icon: left,
  },
  {
    name: "right",
    icon: right,
  }

]

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
