import React, {useState} from 'react';
import {Box, Button, Modal, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface Lot {
  id: number;
  car: string | null;
  time: Date | null;
}

type Parking = Lot[];

const App = () => {
  const [spacesInput, setSpacesInput] = useState<string>('');
  const [spaces, setSpaces] = useState<[] | Parking>([]);
  const [regModal, handleRegModal] = useState<boolean>(false);
  const [unRegModal, handleUnRegModal] = useState<boolean>(false);
  const [carRegistration, setRegistration] = useState<string>("");
  const [currSpace, setCurrSpace] = useState<null | number>(null);

  return (
    <div className='app'>
      <TextField
        id="parking-create-text-input"
        label="Number of spaces Text Input"
        variant="outlined"
        sx={{ width: '235px' }}
        value={spacesInput}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (+event.target.value >= 0) {
            setSpacesInput(event.target.value)
          }
        }}
      />
      <Button
        variant="text"
        sx={{ height: '56px' }}
        onClick={() => {
          setSpaces(Array.from(Array(+spacesInput).keys()).map((el) => ({id: el, car: null, time: null})));
        }}
      >
        Create parking
      </Button>
      {!!spaces.length && <div className='parking'>
        {spaces.map((space) => {
          return (
            <div
              key={`parking-drawing-space-${space.id}`}
              className='parkingLot'
              id={space.car ? `parking-drawing-registered-${space.id}` : `parking-drawing-space-${space.id}`}
              onClick={() => {
                if (space.car) {
                  handleUnRegModal(true)
                } else {
                  handleRegModal(true)
                }
                setCurrSpace(space.id)

              }}
              style={{ backgroundColor: space.car ? 'grey' : 'white', color: space.car ? 'white' : 'rgba(128, 128, 128, 0.5)'}}
            >
              <div id={`parking-drawing-space-number-${space.id}`}>
                {space.id}
              </div>
            </div>
          )
        })}
      </div>}
      {regModal &&
        <Modal
          open={regModal}
          onClose={() => handleRegModal(false)}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
	          <CloseIcon onClick={() => handleRegModal(false)} sx={{cursor: 'pointer', justifyContent: 'end', display: 'flex'}}/>
            <TextField
              id='parking-drawing-registration-input'
              label="Car Registration"
              variant="outlined"
              value={carRegistration}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setRegistration(event.target.value)
              }}
              sx={{marginTop: '10px'}}
            />
	          <Button
		          variant="text"
		          onClick={() => {
                if (carRegistration) {
                  setSpaces(spaces.map((space) => (space.id === currSpace) ? {
                    ...space, car: carRegistration, time: new Date } : space));
                  setRegistration("")
                  handleRegModal(false);
                  setCurrSpace(null)
                }
              }}
              id="parking-drawing-add-car-button"
	          >
		          Add car
	          </Button>
          </Box>
        </Modal>
      }
      {<Modal
	      open={unRegModal}
	      onClose={() => handleUnRegModal(false)}
	      sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
        }}
        id="deregister-car-registration"
      >
	      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
		      <CloseIcon
            onClick={() => handleUnRegModal(false)}
            sx={{cursor: 'pointer', justifyContent: 'end', display: 'flex'}}
            id="deregister-back-button"
          />
	        <div id="deregister-time-spent">TimeSpend: </div>
	        <div id="deregister-charge">Parking charge: </div>
          <Button id="deregister-payment-button">Payment taken</Button>
        </Box>
      </Modal>}
    </div>
  );
}

export default App;
