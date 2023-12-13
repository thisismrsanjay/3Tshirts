import React,{useState,useEffect} from 'react'
import {AnimatePresence,motion} from 'framer-motion'
import { useSnapshot} from 'valtio'


import config from '../config/config'

import state from '../store'

import {download, logoShirt} from '../assets';
import { downloadCanvasToImage,reader } from '../config/helpers'
import {EditorTabs , FilterTabs,DecalTypes, MoveTabs} from '../config/constants'

import { fadeAnimation,slideAnimation } from '../config/motion'

import { AIPicker,ColorPicker,FilePicker,Tab,CustomButton } from '../components'


const Customizer = () => {
  const snap = useSnapshot(state);

  const [file,setFile] = useState('')
  const [prompt,setPrompt] = useState('')

  const [generatingImg,setGeneratingImg] = useState(false);

  const [activeEditorTab,setActiveEditorTab] = useState("")

  const [activeFilterTab,setActiveFilterTab] = useState({
    logoShirt:true,
    stylishShirt:false
  })

  const handleDecals = (type,result) =>{
    const decalType  = DecalTypes[type]
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab);

    }
  }
  const handleMoveTab = (tab) =>{
    switch(tab){
     
      case "up":
        state.y += 0.01
        break
      case "down":
        state.y -= 0.01
        break
      case "left":
        state.x -= 0.01
        break
      case "right":
        state.x += 0.01
        break
      default:
        state.isFullTexture = true
        state.isLogoTexture = false
        break;
    }}
  const handleActiveFilterTab = (tab) =>{
    switch(tab){
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tab]
        break
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tab]
        break
      case "plus":
        state.scale += 0.01
        break
      case "minus":
        state.scale -= 0.01
        break
      case "rotateleft":
        console.log("hello")
        state.rotate -= 0.25
        break
      case "rotateright":
        state.rotate += 0.25
        break
      default:
        state.isFullTexture = true
        state.isLogoTexture = false
        break;
    }
    
    //after setting state update activefilter

    setActiveFilterTab((prevState)=>{
      return {
        ...prevState,
        [tab]:!prevState[tab]
      }
    })
  }
  
  const readFile = (type) =>{
    reader(file)
      .then((result)=>{
        handleDecals(type,result);
        setActiveEditorTab('')
      })
  }

  //showing active tag
  const generateTabContent = ()=>{
    switch(activeEditorTab){
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker
          file = {file}
          setFile ={setFile}
          readFile = {readFile}
        />
      case "aipicker":
        return <AIPicker
        prompt = {prompt}
        setPrompt = {setPrompt}
        generatingImg = {generatingImg}
        handleSubmit = {handleSubmit}
        
        />
      default:
        return null
    }
  }
 
  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:5000/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }
  
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key="custom" {...slideAnimation("left")} className='absolute top-0 left-0 z-10'>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                   
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />

                  
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeAnimation} className='absolute z-20 top-5 right-5'>
                    <CustomButton
                      type="filled"
                      title = "back"
                      handleClick={()=>state.intro = true}
                      customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                    />
          </motion.div>
          
          <motion.div className='movetabs-container' {...slideAnimation('up')}>
          <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
          {MoveTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    handleClick={() =>handleMoveTab(tab.name)}
                  />
                ))}
                 <button className='download-btn' onClick={downloadCanvasToImage}>
              <img
                src={download}
                alt='download_image'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
                </div>
                
            </div>
          </motion.div>




          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
          {FilterTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    handleClick={() =>handleActiveFilterTab(tab.name)}
                  />
                ))}
                
          </motion.div>
          



        </>
      )}
    </AnimatePresence>
  )
}



export default Customizer;