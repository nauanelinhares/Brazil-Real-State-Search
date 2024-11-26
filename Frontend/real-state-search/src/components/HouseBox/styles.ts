import styled from 'styled-components';
import Link from "@mui/material/Link";


export const HouseImage = styled.img`
    width: 100%;
    height: 200px;
    display: flex;
    border-radius: 8px;
`;

export const HouseDetails = styled.div`
    padding: 16px;
`;

export const HouseTitleLink = styled(Link)`
    margin: 0;
    font-size: 1.2em;
    font-weight: bold;
    color: #333;
`;

export const HouseDescription = styled.p`
    margin: 8px 0;
    font-size: 1em;
    color: #666;
    font-family: roboto;
`;

export const TextField = styled.div`
    font-size: 0.9em;
    color: #666;
    font-family: Roboto;


`;

export const HousePrice = styled.span`
    font-size: 1.2em;
    font-weight: bold;
    color: #000;
`;