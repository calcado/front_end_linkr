import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../constants";
import TopBar from "../TopBar.js";



export function UserPage () {
    
    const userId = useParams()
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        axios.get(`${BASE_URL}/${userId}`)
            .then((ans) => {setUserInfo(ans.data)})
            .catch((ans) => {
                console.log(ans.data)
            })
    }, [])

    return (
        <>
            <TopBar />
            <Container>
                
            </Container>
        </>
    )
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 98vw;
margin-top: 78px;
z-index: -1;
`