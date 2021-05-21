import React, {useState} from 'react';
import Modal from 'react-modal';
import {Box, Button} from '@material-ui/core';
import Tutorial from './Tutorial';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
        right: 'auto',
        height: '400px',
       overflow: 'auto', 
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#ffd1b3'      
    }
};

function ModalInFunctionalComponent (){

    const [modalIsOpen,setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    return(
        <div>
            <Box textAlign='center'>
                <Button type="submit" style={{marginTop: "4%"}} variant="contained" color="primary" onClick={setModalIsOpenToTrue}> Backtracking Tutorial </Button>
            </Box>
                <Modal isOpen={modalIsOpen} style={customStyles}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <Tutorial/>
            </Modal>
        </div>
    )
}
export default ModalInFunctionalComponent;