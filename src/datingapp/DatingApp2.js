import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const SwipeCard = ({ image, name, age, onSwipe }) => {
  return (
    <Card
      as={motion.div}
      initial={{ scale: 1 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      drag="x"
      dragConstraints={{ left: -300, right: 300 }}
      onDragEnd={(event, info) => {
        if (info.point.x > 100) {
          onSwipe('right');
        } else if (info.point.x < -100) {
          onSwipe('left');
        }
      }}
      style={{ position: 'absolute' }}
    >
      <img src={image} alt={`${name}`} style={{ width: '100%', height: 'auto' }} />
      <CardInfo>
        <h2>{name}, {age}</h2>
      </CardInfo>
    </Card>
  );
};

const DatingApp2 = () => {
  const [users, setUsers] = useState([
    {
      image: 'https://image.blip.kr/v1/file/851af67c70b5fec6dd33becedbc9f276',
      name: 'Mia',
      age: 21
    },
    {
      image: 'https://image.blip.kr/v1/file/851af67c70b5fec6dd33becedbc9f276',
      name: 'Liam',
      age: 23
    },
    {
      image: 'https://image.blip.kr/v1/file/851af67c70b5fec6dd33becedbc9f276',
      name: 'Noah',
      age: 22
    },
  ]);

  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([]);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      console.log('Liked');
    } else if (direction === 'left') {
      console.log('Disliked');
    }

    if (index < users.length) {
      setHistory([...history, index]);
      setIndex((prev) => (prev + 1) % users.length);
    }
  };

  const handleButton = (direction) => {
    handleSwipe(direction);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastIndex = history.pop();
      setHistory(history);
      setIndex(lastIndex);
    }
  };

  return (
    <Container>
      <Header>
        <HomeButton>Home</HomeButton>
      </Header>
      <CardContainer>
        <AnimatePresence>
          {index < users.length && (
            <SwipeCard
              key={index}
              image={users[index].image}
              name={users[index].name}
              age={users[index].age}
              onSwipe={handleSwipe}
            />
          )}
        </AnimatePresence>
      </CardContainer>
      <Buttons>
        <Button className="dislike-button" onClick={() => handleButton('left')}>Dislike</Button>
        <Button className="like-button" onClick={() => handleButton('right')}>Like</Button>
        <Button className="undo-button" onClick={handleUndo}>Undo</Button>
      </Buttons>
    </Container>
  );
};

export default DatingApp2;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  overflow: hidden;
`;

const Header = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const HomeButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CardContainer = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const Buttons = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &.like-button {
    background-color: #28a745;
    color: white;
  }

  &.dislike-button {
    background-color: #dc3545;
    color: white;
  }

  &.undo-button {
    background-color: #ffc107;
    color: white;
  }
`;
