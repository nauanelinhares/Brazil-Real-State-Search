import styled from 'styled-components';

export const HouseBoxContainer = styled.div`
    display: flex;
    width: 40%;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

export const HouseImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
`;

export const HouseDetails = styled.div`
    padding: 16px;
`;

export const HouseTitle = styled.h3`
    margin: 0;
    font-size: 1.5em;
    color: #333;
`;

export const HouseDescription = styled.p`
    margin: 8px 0;
    font-size: 1em;
    color: #666;
`;

export const HousePrice = styled.span`
    font-size: 1.2em;
    font-weight: bold;
    color: #000;
`;