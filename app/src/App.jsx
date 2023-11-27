import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [filtterData, setFiltterData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFiltterData(json);
        setLoading(false);
        
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);
  // console.log(data)

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue === "") {
      setFiltterData(null);
    }

    const filtter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFiltterData(filtter);
  };

  const filtterFood = (type) => {
    if (type === "all") {
      setFiltterData(data);
      setSelectedBtn("all");
      return;
    }

    const filtter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFiltterData(filtter);
    setSelectedBtn(type);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="./logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder="search Food" />
          </div>
        </TopContainer>

        <FilterContainer>
          <Button onClick={() => filtterFood("all")}>All</Button>
          <Button onClick={() => filtterFood("breakfast")}>Breakfast</Button>
          <Button onClick={() => filtterFood("lunch")}>Lunch</Button>
          <Button onClick={() => filtterFood("dinner")}>Dinner</Button>
        </FilterContainer>
      </Container>
      <SearchResult data={filtterData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  min-width: 140px;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  align-items: center;

  .search {
    input {
      background-color: black;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      padding: 5px 10px;
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 9px;
  padding-bottom: 5px;
`;

export const Button = styled.button`
  background-color: #dc1e1e;
  border-radius: 5px;
  padding: 5px 7px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;
