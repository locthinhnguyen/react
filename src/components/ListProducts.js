import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

export const ListProducts = () => {
  const [product, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newRating, setNewRating] = useState('');
  const [newCategory, setNewCategory] = useState('');
  // 1 state chua object

  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        const updatedProducts = product.filter((product) => product.id !== id);
        setProducts(updatedProducts);
      });
  };

  const handleAddProduct = () => {
    const title = newTitle.trim();
    const description = newDescription.trim();
    const price = newPrice.trim();
    const rating = newRating.trim();
    const category = newCategory.trim();
    if (title && description && price && rating && category) {
      fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          price,
          rating,
          category,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts([...product, data]);
          // setNewTitle('');
          // setNewDescription('');
          // setNewPrice('');
          // setNewRating('');
          // setNewCategory('');
        });
    }
  };

  const showDetail = (item) => {
    setIsUpdate(false);
    setNewTitle(item?.title);
    setNewDescription(item?.description);
    setNewPrice(item?.price);
    setNewRating(item?.rating);
    setNewCategory(item?.category);
    setIsModalVisible(true);
  };

  // const handleUpdateProduct = (id) => {
  //   const productToUpdate = product.find((product) => product.id === id);

  //   fetch(`https://dummyjson.com/products/${id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       title: productToUpdate.title,
  //       description: productToUpdate.description,
  //       price: productToUpdate.price,
  //       rating: productToUpdate.rating,
  //       category: productToUpdate.category,
  //     }),

  //     headers: {
  //       headers: { 'Content-Type': 'application/json' },
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const updatedProducts = product.map((p) => {
  //         if (p.id === id) {
  //           return data;
  //         }
  //         return p;
  //       });
  //       setProducts(updatedProducts);

  //       console.log('product: ', data);
  //     });
  // };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button type="" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-center pt-5 flex-col gap-5 ">
      <div>
        <h2 className="font-bold text-8">List Product</h2>
        <Table
          onRow={(record, rowIndex) => {
            console.log('record>>');
            return {
              onClick: (event) => {
                showDetail(record);
                // console.log('event: ', event);
                // console.log('record: ', record);
              }, // click row
              onDoubleClick: (event) => {}, // double click row
              onContextMenu: (event) => {}, // right button click row
              onMouseEnter: (event) => {}, // mouse enter row
              onMouseLeave: (event) => {}, // mouse leave row
            };
          }}
          columns={columns}
          dataSource={product}
        />
      </div>
      <div>
        <Button intent="success" onClick={() => setIsModalVisible(true)}>
          Add Product
        </Button>
      </div>
      <Modal
        title="Add Product"
        visible={isModalVisible}
        onOk={handleAddProduct}
        okText={isUpdate ? 'update' : 'ok'}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form>
          <Form.Item label="Title">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Rating">
            <Input
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
