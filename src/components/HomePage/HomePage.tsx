import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { SearchIcon } from "../Icons";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import getCountries from "../../services/api";
import { Country } from "../../types";
import { useNavigate } from "react-router-dom";
import "./style.css";

const HomePage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchedCountry, setSearchedCountry] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    const getAllCountries = async () => {
      const fetchedCountries = await getCountries();
      const { data } = fetchedCountries as { data: Country[] };
      setCountries(data);
    };

    getAllCountries();
  }, []);

  useEffect(() => {
    const CountriesRegions = countries.map((country) => country.region);
    const uniqueRegions = new Set(CountriesRegions);
    setRegions(Array.from(uniqueRegions));
  }, [countries]);

  const handleFilteredCountries = (region: string) => {
    setFilteredCountries(
      countries.filter((country) => country.region === region)
    );
  };

  const searchCountry = (sentCountry: string) => {
    if (!sentCountry) {
      setSearchedCountry([]);
      return;
    }

    setSearchedCountry(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(sentCountry.toLowerCase())
      )
    );
  };

  let countriesToDisplay: Country[] = [];

  if (countries.length > 0) {
    if (searchedCountry.length > 0) {
      countriesToDisplay = searchedCountry;
    } else {
      countriesToDisplay =
        filteredCountries.length > 0 ? filteredCountries : countries;
    }
  }

  return (
    <>
      <div id="homepage-inputs">
        <InputGroup className="search-input mb-3">
          <InputGroup.Text>
            <SearchIcon />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search for a country..."
            onChange={(e) => searchCountry(e.target.value)}
          />
        </InputGroup>

        <Form.Select
          aria-label="Default select example"
          size="sm"
          className="filter-dropdown"
          value={selectedRegion || ""}
          onChange={(e) => {
            handleFilteredCountries(e.target.value);
            setSelectedRegion(e.target.value);
          }}
        >
          <option value="" disabled>
            Filter by region
          </option>
          {regions.map((region) => {
            return (
              <option key={region} value={region}>
                {region}
              </option>
            );
          })}
        </Form.Select>
      </div>
      <div className="countries-container">
        {countriesToDisplay.map((country, index) => {
          return (
            <Card
              className="country-card"
              key={index}
              onClick={() =>
                navigate("/country-details", { state: { country, countries } })
              }
            >
              <Card.Img
                variant="top"
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                style={{ height: "50%" }}
              />
              <Card.Body>
                <Card.Title className="country-name">
                  {country.name.common}
                </Card.Title>
                <Card.Text className="card-info">
                  Population: {country.population}
                </Card.Text>
                <Card.Text className="card-info">
                  Region: {country.region}
                </Card.Text>
                <Card.Text className="card-info">
                  Capital: {country.capital}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
