import React from 'react'
import { Link, useParams } from 'react-router-dom'
import products from '../products'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'


const ProductScreen = () => {
    const { id: productId } = useParams()
    const product = products.find((p) => p._id === productId);

    return (
        <>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                        <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>{product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>{product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col><strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block' disabled={product.countInStock === 0} type='button'>Add To Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
