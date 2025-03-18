import { Button, ListGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import "./style.css";
import { Country } from "../../types";

const CountryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { country, countries } = location.state || {};

  const { languages, currencies } = country;
  const countryLanguages = Object.values(languages).join(", ");
  const countryCurrencies = Object.values(
    currencies as Record<string, { name: string; symbol: string }>
  )[0].name;

  const computeBorders = (val: string) => {
    const country = countries.find((item: Country) => {
      return item.cca3.toLowerCase() === val.toLowerCase();
    });
    return country ? country.name.common : "";
  };

  return (
    <div className="container-info">
      <Button
        className="back-button"
        variant="outline-secondary"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <div className="country-details">
        <Image
          className="flag"
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          style={{ width: "70%" }}
        />

        <div className="info">
          <div className="country-name-title">{country.name.common}</div>

          <ListGroup className="list-group">
            <ListGroup.Item className="info-fields">
              <strong>Native Name:</strong> {country.name.common}
            </ListGroup.Item>
            <ListGroup.Item className="info-fields">
              <strong>Population:</strong> {country.population}
            </ListGroup.Item>
            <ListGroup.Item className="info-fields">
              <strong>Region:</strong> {country.region}
            </ListGroup.Item>
            <ListGroup.Item className="info-fields">
              <strong>Sub Region:</strong> {country.subregion}
            </ListGroup.Item>
            <ListGroup.Item className="info-fields">
              <strong>Capital: </strong> {country.capital}
            </ListGroup.Item>
            <ListGroup.Item className="info-fields">
              <strong>Top Level Domain:</strong> {country.tld}
            </ListGroup.Item>
            <ListGroup.Item className="info-fields">
              <strong>Currencies:</strong> {countryCurrencies}
            </ListGroup.Item>
            <ListGroup.Item className="info-fields">
              <strong> Languages:</strong> {countryLanguages}
            </ListGroup.Item>
          </ListGroup>
          <div className="border-countries">
            {country.borders?.length > 0 && (
              <>
                Border Countries:
                {country.borders.map((border: string, index: number) => (
                  <div key={index} className="borders">
                    {computeBorders(border)}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
