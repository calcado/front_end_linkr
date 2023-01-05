import styled from "styled-components"



export default function TopBar ({picture}) {



    return (
        <Bar>
            <span>linkr</span>
            <Menu>
                <ion-icon name="chevron-down-outline"></ion-icon>
                <img src={picture} alt="profile"/>
            </Menu>
        </Bar>
    )
}

const Bar = styled.div`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 72px;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 15px;
    span{
        font-family: 'Passion One';
        font-size: 49px;
        letter-spacing: 3px;
    }
`

const Menu = styled.div`

`