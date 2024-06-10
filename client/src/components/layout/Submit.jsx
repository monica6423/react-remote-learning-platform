import * as React from 'react'
import { motion } from 'framer-motion'

export const Submit = (props) => {
  return (
    <motion.div
      className="example-container"
      whileHover={{
        scale: 1.3,
        borderRadius: 20,
        backgroundColor: '#FFE45D',
        boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)',
      }}
      whileTap={{ scale: 0.8, borderRadius: 80 }}
    >
      <input
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        type="submit"
        value={props.value}
      />
    </motion.div>
  )
}
