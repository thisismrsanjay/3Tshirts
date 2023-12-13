import React from 'react';

import CustomButton from './CustomButton';


const AIPicker = ({prompt,setPrompt,generatingImg,handleSubmit}) => {
  return (
    <div className='aipicker-container'>
      <textarea name="" className='aipicker-textarea' placeholder='propmt AI to generate design'  rows="5" 
      
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg?
        
         ( <CustomButton
            type="outline"
            title="Generating..."
            customStyles="text-xs"

          />):
          <>
          {/* <CustomButton type="outline"  customStyles="text-xs" title="Use Logo" handleClick={()=>handleSubmit('logo')} />

          <CustomButton type="filled" customStyles="text-xs" title="Use Texture" handleClick={
            ()=>handleSubmit('full')
            
            }/> */}
          </>

        }
      </div>
    </div>
  )
}

export default AIPicker