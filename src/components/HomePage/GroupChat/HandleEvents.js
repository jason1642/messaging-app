
import styled from 'styled-components';

const DisconnectButton = styled.button`
  padding: 5px 15px;
  font-size: 20px;
  
`;



const handleDisconnect = ({ socket }) => {
  
  // Voluntary disconnect
  const disconnectMe = () => {
    socket.disconnect()
  }
  return ( 
    <DisconnectButton
    // onClick={}
    >

    </DisconnectButton>
   );
}
 
export default handleDisconnect;