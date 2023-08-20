import styled from 'styled-components';

const ControlPanel = () => {
    return ( 
        <ControlPanelBox>
            <KeyContainer>
                <ArrowKeysContainer>
                    <KeySymbol>&#8592;</KeySymbol> 
                    <KeySymbol>&#8594;</KeySymbol> 
                </ArrowKeysContainer>
                <KeyInstruction>Choose Card</KeyInstruction>
            </KeyContainer>
            <KeyContainer>
                <KeySymbol>&#8629;</KeySymbol>
                <KeyInstruction>Play Card</KeyInstruction>
            </KeyContainer>
            <KeyContainer>
                <KeySymbol>␣</KeySymbol>
                <KeyInstruction>Pass Round</KeyInstruction>
            </KeyContainer>
            <KeyContainer>
                <KeySymbol>i</KeySymbol> 
                <KeyInstruction>Toggle Card Info</KeyInstruction>
            </KeyContainer>
        </ControlPanelBox>
    );
}

const ControlPanelBox = styled.div`
    width: 50%;
    color: darkgoldenrod;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    padding: 10px;
    margin: 25px;
`;

const KeyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; /* Align symbols to left and instructions to right */
    margin: 5px;
    width: 100%; /* Set container to full width */
`;

const ArrowKeysContainer = styled.div`
    display: flex;  
`

const KeySymbol = styled.div`
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgb(175, 139, 81);
    border-radius: 10px;
    font-size: 16px;
    font-weight: bolder;
    color: rgb(175, 139, 81);
    margin-right: 10px;
`;

const KeyInstruction = styled.div`
    font-size: 14px;
    color: darkgoldenrod;
`;

const ControlPanelTitle = styled.h4`
    font-size: 18px;
    font-weight: bolder;
    color: rgb(175, 139, 81);
    margin-right: 20px;
    padding: 0;
`;

export default ControlPanel;
