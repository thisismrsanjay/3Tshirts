
import {motion,AnimatePresence} from 'framer-motion';
import {useSnapshot} from 'valtio';
import state from '../store';

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion'

import {CustomButton} from '../components'


const Home = () => {
    const snap = useSnapshot(state)
return (
    <AnimatePresence>
        {snap.intro && (
            <motion.section className='home' {...slideAnimation('left')}>
                <motion.header {...slideAnimation('down')}>
                    <p className='bold text-white font-mono text-2xl'>3Tshirts</p>
                </motion.header>

                <motion.div className='home-content' {...headContainerAnimation}>
                    <motion.div className='' {...headTextAnimation}>
                        <h1 className='text-7xl font-mono text-white'>
                            LET'S <br className='xl:block hidden' /> DESIGN IT.
                             

                        </h1>
                    </motion.div>
                    <motion.div className='flex flex-col gap-5' {...headContentAnimation}>
                      
                        <CustomButton 
                            type="filled"
                            title="Start Designing"
                            handleClick= {()=> state.intro = false}
                            customStyles = "w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>
                </motion.div>
            </motion.section>
        )}
    </AnimatePresence>

  )
}

export default Home