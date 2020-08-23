import * as React from "react";
import { motion } from "framer-motion";

export const ViewButton = (props) => {
  return (
    <motion.div className="view-buttons"
      whileHover={{ scale: 1.2, borderRadius: 20, backgroundColor: "#FFE45D", boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)"}}
      whileTap={{ scale: 0.8, borderRadius: 80}}
    >
      <span style={{width: "100%", backgroundColor: "transparent", borderColor:"transparent", color:"white", textAlign:"center"}}>{props.text}</span>
    </motion.div>
  );
};
