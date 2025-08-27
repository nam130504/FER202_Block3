import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaEye, FaCartPlus, FaHeart } from 'react-icons/fa';
import { formatPrice } from '../utils/format';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card className="h-100 shadow-sm product-card">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2">{product.name}</Card.Title>
        <Card.Text className="flex-grow-1 small text-muted mb-2">
          {product.description}
        </Card.Text>
        <div className="mb-3">
          <Badge bg="primary" className="fs-6">{formatPrice(product.price)}</Badge>
        </div>
        <Button
          variant="outline-primary"
          size="sm"
          className="mb-2"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <FaEye className="me-1" /> View Details
        </Button>
        <Button variant="success" size="sm" className="mb-2">
          <FaCartPlus className="me-1" /> Add to Cart
        </Button>
        <Button variant="outline-danger" size="sm">
          <FaHeart className="me-1" /> Favourite
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
