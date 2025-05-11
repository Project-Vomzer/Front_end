import { createContext } from "react";

export const VomzerContext = createContext()


const VomzerContextProvider = (props)=> {



    const value = {

    }


    return (
            <VomzerContext.Provider  value={value}>
                {props.children}
            </VomzerContext.Provider>
        )
}


export default VomzerContextProvider