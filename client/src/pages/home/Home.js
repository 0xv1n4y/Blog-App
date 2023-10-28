

import React, { useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { FaAngleDoubleRight } from 'react-icons/fa';
import './home.css';

const Home = ({ search, handleDelete, products, setProducts }) => {
  // To fetch the Total posts from the server
  useEffect(() => {
    axios.get('http://localhost:5200/api/post/').then((res) => {
      // Sort the products by createdAt in descending order
      const sortedProducts = res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setProducts(sortedProducts);
    })
    .catch((err) => console.log(err.message));
  }, [setProducts]);

  return (
    <div className="ast">
      {products
        .filter((product) => {
          const query = search.toLowerCase();
          return (
            product.title.toLowerCase().includes(query) ||
            product.content.toLowerCase().includes(query)
          );
        })
        .map((product) => (
          <div className="container" key={product._id}>
            <div className="card">
              <div className="card__header">
                <img
                  src={`http://localhost:5200/${product.image}`}
                  alt="card__image"
                  className="card__image"
                  width="600"
                />
              </div>
              <div className="card__body">
                <NavLink to={`/single/${product._id}`} className="nav-link">
                  <h4>{product.title.toUpperCase()}</h4>
                </NavLink>
                <p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.content.slice(0, 50),
                    }}
                  ></div>
                </p>
              </div>
              <div className="card__footer">
                <div className="user">
                  <NavLink to={`/single/${product._id}`}>
                    <Button variant="outline-info">
                      ReadMore <FaAngleDoubleRight />
                    </Button>{' '}
                  </NavLink>
                  <div className="user__info">
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash /> Delete
                    </Button>{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;

