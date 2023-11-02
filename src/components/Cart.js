import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NoPermission from './NoPermission';
import Loading from './Loading';

export default function Cart() {
    const { id } = useParams();

    const [dataLoad, setDataLoad] = useState(false);
    const [user, setUser] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [cartData, setCartData] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [discountedTotal, setDiscountedTotal] = useState(0);

    useEffect(() => {
        setDataLoad(false);
        axios
            .get(`https://dummyjson.com/users/${id}`)
            .then(res => {
                setUser(res.data);
                axios
                    .get(`https://dummyjson.com/carts/user/${id}`)
                    .then(res => {
                        setCartData(res.data);
                        setFilteredProducts(res.data?.carts[0]?.products);
                        setDataLoad(true);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (dataLoad) {
            setFilteredProducts(
                cartData.carts[0]?.products.filter(product => {
                    return product.title
                        .toLowerCase()
                        .startsWith(searchValue.toLowerCase());
                }) ?? []
            );
        }
        setTotal(
            filteredProducts.reduce((acc, product) => {
                return acc + product.total;
            }, 0)
        );
        setDiscountedTotal(
            filteredProducts.reduce((acc, product) => {
                return acc + product.discountedPrice;
            }, 0)
        );
    }, [cartData, searchValue]);

    const handleQuantityChange = (id, quantity) => {
        const newCartData = { ...cartData };
        const product = newCartData.carts[0].products.find(
            product => product.id === id
        );
        product.quantity = quantity;
        product.total = product.price * quantity;
        product.discountedPrice = Math.round(
            product.price * quantity * (1 - product.discountPercentage / 100)
        );
        setCartData(newCartData);
    };
    if (!dataLoad) return <Loading />;
    if (
        sessionStorage.getItem('userId') === null
            ? -1
            : sessionStorage.getItem('userId') !== id
    ) {
        return <NoPermission />;
    }
    return (
        <Container>
            <h1 style={{ textAlign: 'center' }}>Cart Information</h1>
            <p>Username: {user?.username}</p>
            <Row className="d-flex justify-content-center mb-3">
                <Col className="col-4 ">
                    <input
                        className="form-control cl-12"
                        type="text"
                        placeholder="Please enter title to search"
                        onChange={e => setSearchValue(e.target.value)}
                    />
                </Col>
            </Row>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Discount Price</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredProducts?.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>${product.price}</td>
                            <td>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={product.quantity}
                                    onChange={e => {
                                        handleQuantityChange(
                                            product.id,
                                            Number(e.target.value)
                                        );
                                    }}
                                />
                            </td>
                            <td>${product.total}</td>
                            <td>${product.discountedPrice}</td>
                            <td>
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    style={{ width: '100px', height: 'auto' }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Total: ${total}</p>
            <p>Discounted Total: ${discountedTotal}</p>
        </Container>
    );
}
