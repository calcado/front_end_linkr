import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import BASE_URL from "../constants";
import TopBar from "../TopBar.js";
import userContext from "../userContext";



export function UserPage() {

    const userPageId = useParams()
    const [userPageInfo, setUserPageInfo] = useState()
    const [userInfo, setUserInfo] = useContext(userContext)
    const [disable, setDisable] = useState(false)
    const token = JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
        axios.get(`${BASE_URL}/user/${userPageId.id}?userId=${userInfo?.userId}`)
            .then((ans) => {
                setUserPageInfo(ans.data)
            })
            .catch((ans) => {
                console.log(ans.data)
            })
    }, [userPageId, userInfo, disable])

    function follow() {
        setDisable(true)
        axios.post(`${BASE_URL}/follow/${userPageId.id}`, {}, { headers: { "authorization": `Bearer: ${token}` } })
            .then((ans) => {
                setDisable(false)
            })
            .catch((ans) => {
                console.log(ans)
                setDisable(false)
            })
    }

    function unfollow() {
        setDisable(true)
        axios.post(`${BASE_URL}/unfollow/${userPageId.id}`, {}, { headers: { "authorization": `Bearer: ${token}` } })
            .then((ans) => {
                setDisable(false)
            })
            .catch((ans) => {
                console.log(ans)
                setDisable(false)
            })
    }

    return (
        <>
            <TopBar />
            <Container>
                <Feed>
                    <UserTitle userInfo={userInfo} following={userPageInfo?.following} disable={disable}>
                        <div>
                            <img src={userPageInfo?.urlPicture} alt="profile" />
                            <span>{userPageInfo?.userName} Posts</span>
                        </div>
                        {(userPageId.id != userInfo?.userId && userPageInfo?.following === false)
                            &&
                            <button onClick={() => follow()}>
                                follow
                            </button>
                        }
                        {(userPageId.id != userInfo?.userId && userPageInfo?.following === true)
                            &&
                            <button onClick={()=> unfollow()}>
                                Unfollow
                            </button>
                        }
                    </UserTitle>
                    {userPageInfo?.posts && userPageInfo.posts.map((info, i) => {
                        return (
                            <Publication key={i}>
                                <Perfil src={userPageInfo.urlPicture} />
                                <ion-icon name="heart-outline"></ion-icon>
                                <PostInfo>
                                    <h1>{userPageInfo.userName}</h1>
                                    <h2>{info.description}</h2>
                                    <Links>
                                        <div>
                                            <h3>{info.titulo}</h3>
                                            <h4>{info.descricao}</h4>
                                            <a target="_blank" href={info.url}> {info.url}</a>
                                        </div>
                                        <img src={info.imgurl}></img>
                                    </Links>
                                </PostInfo>
                            </Publication>)
                    }
                    )}
                </Feed>
            </Container>
        </>
    )
}

const Container = styled.div`
    padding-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 98vw;
    color: white;
`

const PostInfo = styled.div`
    display:flex;
    margin-left: 87px;
    margin-top: 10px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    max-width:520px;
    flex-direction: column;
`

const UserTitle = styled.div`
    width: 611px;
    justify-content: space-between;
    font-family: 'Oswald';
    display: flex;
    align-items: center;
    padding-left: 10px;
    letter-spacing: 2px;
    font-size: 43px;
    margin-bottom: 25px;
    img{
        object-fit: cover;
        margin-right: 25px;
        font-size: 12px;
        width: 53px;
        height: 53px;
        border-radius: 50%;
    }
    button{
        display: ${props => (props.userInfo) ? 'show' : 'none'};
        background-color: ${props => (props.following) ? 'white' : '#1877F2'};
        color: ${props => (props.following) ? '#1877F2' : 'white'};
        cursor: ${props => (props.disable) ? 'auto' : 'pointer'};
        pointer-events: ${props => props.disable && 'none'};
    }
`

const Feed = styled.div`
    margin-top: 28px;
`

const Links = styled.footer`
    display:flex;
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    padding-left:19px;
    justify-content: space-between;

    img{
    border-top-right-radius: 11px;
    border-bottom-right-radius: 11px;
    height: 100%;
    width: 154px;
    object-fit: cover;
    }
    
    h3{
    margin-top:24px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #CECECE;
    }

    h4{
    margin-top:5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9B9595;
    }

    a{
    margin-top:13px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-decoration:none;
    color: #CECECE;
    }
`

const Publication = styled.div`
    margin-bottom:16px;
    background: #171717;
    width: 611px;
    min-height: 276px;
    border-radius: 16px;
    position:relative;
    display:flex;
    padding-right:21px;
    font-family: 'Lato';

    ion-icon{
        color: white;
        font-size: 30px;
        position: absolute;
        top: 35%;
        left: 27px;
        cursor: pointer;
    }

h1{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    word-wrap: break-word;
}
h2{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
    word-wrap: break-word;
    margin-right:22px;
}

`

const Perfil = styled.img`
    position:absolute;
    width:50px;
    height:50px;
    border-radius: 50%;
    left: 18px;
    top: 16px;
`