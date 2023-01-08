import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BASE_URL from "./constants.js";
import TopBar from "./TopBar.js";

export default function Trending() {
    const [trendingList, setTrendingList] = useState();
    const navigate = useNavigate();
    const { hashtag } = useParams();

    useEffect(() => {
        axios
            .get(`${BASE_URL}/trending`)
            .then((res) => setTrendingList(res.data))
            .catch((err) => alert("Erro ao carregar o trending"));
    }, []);

    return (
        <MainPage>
        <TopBar />
            <Container>
                <Tittle># {hashtag}</Tittle>
                <Publications>
                    <Publication>
                        <img src="" alt=""></img>
                        <div>
                            <h1>Usuario</h1>
                            <h2>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Morbi at libero convallis,
                                finibus tortor quis, finibus metus. Quisque
                                maximus, nibh id dictum posuere, sapien diam
                                porttitor justo, eu mollis magna lacus nec elit.
                                Nulla pulvinar
                            </h2>
                        </div>
                    </Publication>
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
