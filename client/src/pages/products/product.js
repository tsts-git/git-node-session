import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { useSelector } from 'react-redux';
import {
  useGetProductsQuery,
  useDeleteItemMutation
} from "../features/products/ProductsApiSlice";

import './product.css';

const ProductScreen = () => {
  const toast = useRef(null);
  const { data: products = [], isLoading, error, refetch } = useGetProductsQuery();
  const [deleteItem] = useDeleteItemMutation();
  const { userInfo } = useSelector((state) => state.userLogin || {});

  const handleDelete = async (id) => {
    try {
      await deleteItem(id).unwrap();
      toast.current.show({ severity: 'success', summary: 'נמחק', detail: 'המוצר נמחק בהצלחה' });
      refetch();
    } catch {
      toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'מחיקה נכשלה' });
    }
  };

  const productImages = {
    'נדנדה מעוצבת': 'https://cdn.pixabay.com/photo/2015/03/30/12/35/swing-698547_960_720.jpg',
    'בריכה משפחתית': 'https://cdn.pixabay.com/photo/2018/08/20/20/57/swimming-pool-3614184_960_720.jpg',
    'שולחן גינה עגול': 'https://cdn.pixabay.com/photo/2019/07/06/19/48/garden-furniture-4320674_960_720.jpg',
    'גריל גז מקצועי': 'https://cdn.pixabay.com/photo/2017/04/20/14/38/barbecue-2245021_960_720.jpg',
  };

  return (
    <div className="product-container">
      <Toast ref={toast} />
      <h2 className="title">המוצרים שלנו</h2>

      {isLoading ? (
        <div className="centered"><ProgressSpinner /></div>
      ) : error ? (
        <Message severity="error" text="שגיאה בטעינת המוצרים" />
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <Card
              key={product._id}
              title={product.name}
              subTitle={`מחיר: ₪${product.price}`}
              className="product-card"
              header={
                <img
                  src={productImages[product.name] || 'https://via.placeholder.com/300x200?text=Garden+Product'}
                  alt={product.name}
                  className="product-image"
                />
              }
              footer={
                <div className="product-footer">
                  <Button label="הוסף לסל" icon="pi pi-shopping-cart" className="p-button-success p-button-sm" />
                  {userInfo?.isAdmin && (
                    <Button
                      icon="pi pi-trash"
                      className="p-button-danger p-button-sm"
                      onClick={() => handleDelete(product._id)}
                      tooltip="מחק מוצר"
                      tooltipOptions={{ position: 'top' }}
                    />
                  )}
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductScree
