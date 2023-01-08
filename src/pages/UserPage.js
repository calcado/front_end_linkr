import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../constants";
import TopBar from "../TopBar.js";



export function UserPage() {

    const userId = useParams()
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        axios.get(`${BASE_URL}/user/${userId.id}`)
            .then((ans) => {
                setUserInfo(ans.data)
            })
            .catch((ans) => {
                console.log(ans.data)
            })
    }, [userId])

    return (
        <>
            <TopBar />
            <Container>
                <Feed>
                    <UserTitle>
                        <img src={userInfo?.urlPicture} alt="profile" />
                        <span>{userInfo?.userName} Posts</span>
                    </UserTitle>
                    {userInfo?.posts && userInfo.posts.map((info, i) => {
                        return (
                        <Publication key={i}>
                            <Perfil src={userInfo.urlPicture} />
                            <PostInfo>
                                <h1>{info.userName}</h1>
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
                        </Publication>)}
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
    font-family: 'Oswald';
    display: flex;
    align-items: center;
    padding-left: 10px;
    letter-spacing: 2px;
    font-size: 43px;
    margin-bottom: 25px;
    img{
        margin-right: 25px;
        font-size: 12px;
        width: 53px;
        height: 53px;
        border-radius: 50%;
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