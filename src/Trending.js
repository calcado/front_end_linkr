import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BASE_URL from "./constants.js";
import TopBar from "./TopBar.js";

export default function Trending() {
    const { hashtag } = useParams();

    const [trendingList, setTrendingList] = useState();
    const [feed, setFeed] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${BASE_URL}/trending`)
            .then((res) => setTrendingList(res.data))
            .catch(() => alert("Erro ao carregar o trending"));

        axios
            .get(`${BASE_URL}/hashtag/${hashtag}`)
            .then((res) => setFeed(res.data))
            .catch(() =>
                alert(
                    "An error ocurred while trying to fetch the posts,please refresh the page"
                )
            );
    }, []);

    return (
        <MainPage>
            <TopBar />
            <Container>
                <Tittle># {hashtag}</Tittle>
                <Publications>
                        {feed
                            ? feed.map((ref) => {
                                  return (
                                      <Publication>
                                          <Perfil src={"https://encryptedtatic.com/images?q=tbn:ANd9GcRS-bz3w3YbiCPW23zQNWR0sjH7WNZFmCV_6Q&usqp=CAU-tbn0.gs"}/>
                                          <DisplayFlex>
                                              <h1>MEU NOME LINDO</h1>
                                              <h2>{ref.description}</h2>
                                              <Links>
                                                  <div>
                                                      <h3>{ref.titulo}</h3>
                                                      <h4>{ref.descricao}</h4>
                                                      <a
                                                          target="_blank"
                                                          href={ref.url}
                                                          rel="noreferrer"
                                                      >
                                                          {" "}
                                                          {ref.url}
                                                      </a>
                                                  </div>
                                                  <img
                                                      src={ref.imgurl}
                                                      alt="Url Img"
                                                  ></img>
                                              </Links>
                                          </DisplayFlex>
                                      </Publication>
                                  );
                              })
                            : "There are no posts yet"}
                </Publications>
            </Container>
            <TrendingBar>
                <h2>trending</h2>
                <div />
                {trendingList?.map((trend) => (
                    <li onClick={() => navigate(`/hashtag/${trend.name}`)}>
                        # {trend.name}
                    </li>
                ))}
            </TrendingBar>
        </MainPage>
    );
}
const MainPage = styled.div`
    display: flex;
`;
const TrendingBar = styled.ul`
    width: 301px;
    list-style-type: none;
    height: 406px;
    display: flex;
    flex-direction: column;
    margin: 78px 0 0 25px;
    background: #171717;
    border-radius: 16px;
    h2 {
        position: absolute;
        width: 95px;
        font-family: "Oswald";
        font-style: normal;
        font-weight: bold;
        font-size: 27px;
        line-height: 40px;
        color: #ffffff;
    }
    div {
        height: 1px;
        background-color: #484848;
        margin-top: 61px;
    }
    li {
        width: 230px;
        height: 293px;
        font-family: "Lato";
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 23px;
        letter-spacing: 0.05em;
        color: #ffffff;
        overflow: scroll;
    }
`;
const Publications = styled.div`
    margin-top: 28px;
`;
const Publication = styled.div`
    background: #171717;
    width: 611px;
    min-height: 276px;
    border-radius: 16px;
    position: relative;
    display: flex;
    img {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        left: 18px;
        top: 16px;
    }
    div {
        display: flex;
        margin-left: 87px;
        margin-top: 10px;
        font-family: "Lato";
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        max-width: 520px;
        flex-direction: column;
    }
    h1 {
        font-family: "Lato";
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #ffffff;
        word-wrap: break-word;
    }
    h2 {
        font-family: "Lato";
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #b7b7b7;
        word-wrap: break-word;
        margin-right: 22px;
    }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
    margin: 78px 0 0 241px;
`;
const Tittle = styled.h1`
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: white;
`;
const DisplayFlex = styled.div`
    display: flex;
    margin-left: 87px;
    margin-top: 10px;
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    max-width: 520px;
    flex-direction: column;
`;
const Links = styled.footer`
    display: flex;
    width: 503px;
    height: 155px;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    padding-left: 19px;
    justify-content: space-between;
    img {
        border-top-right-radius: 11px;
        border-bottom-right-radius: 11px;
        height: 100%;
        width: 154px;
    }
    h3 {
        margin-top: 24px;
        font-family: "Lato", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #cecece;
    }
    h4 {
        margin-top: 5px;
        font-family: "Lato", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #9b9595;
    }
    a {
        margin-top: 13px;
        font-family: "Lato", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        text-decoration: none;
        color: #cecece;
    }
`;
const Perfil = styled.img`
    position:absolute;
    width:50px;
    height:50px;
    border-radius: 50%;
    left: 18px;
    top: 16px;

`