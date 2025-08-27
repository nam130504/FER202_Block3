import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import api from "../services/api";
import { formatPrice, assetUrl } from "../utils/format";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        // Chuẩn hóa dữ liệu giống ProductsPage
        setProduct({
          id: data.id,
          name: data.title || data.name,
          image: data.image
            ? assetUrl(data.image)
            : `https://picsum.photos/seed/${data.id}/600/400`,
          price: data.price,
          description: data.description,
          category: data.category
        });
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    })();
  }, [id]);

  if (!product) return <Container className="py-4">Loading...</Container>;

  return (
    <Container className="py-4">
      <Card>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <h5 className="text-primary">{formatPrice(product.price)}</h5>
          <Button variant="success">Add to Cart</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
