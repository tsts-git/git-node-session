import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useDeleteFromBasketMutation, useGetBasketQuery, useUpdateItemBasketQuantityMutation } from './BasketApiSlice';
import useAuth from '../../features/aouth/useAuth';

const Basket = () => {
  const { data: basket = [] } = useGetBasketQuery();
  const [removeFromBasket] = useDeleteFromBasketMutation();
  const [updateItemBasketQuantity] = useUpdateItemBasketQuantityMutation();
  const roles = useAuth()?.roles;

  return (
    <div className="p-4" style={{ direction: 'rtl' }}>
      <h2 className="text-2xl text-center mb-5 text-green-700">🛒 סל הקניות שלך</h2>

      {basket.length === 0 ? (
        <p className="text-center text-gray-500">הסל שלך ריק</p>
      ) : (
        <div className="grid gap-4">
          {basket.map((item) => {
            const { _doc, quantity } = item;
            const total = _doc?.price * quantity;

            return (
              <Card
                key={item._id || item.id}
                title={_doc?.name}
                subTitle={`מחיר ליחידה: ₪${_doc?.price}`}
                className="shadow-md"
              >
                <p>כמות: {quantity}</p>
                <p>סה"כ: ₪{total}</p>

                <div className="flex gap-2 mt-3">
                  {roles === "Admin" && (
                    <Button
                      label="הסר מהסל"
                      icon="pi pi-trash"
                      className="p-button-danger"
                      onClick={() => removeFromBasket({ productId: _doc._id })}
                    />
                  )}
                  <Button
                    label="-"
                    icon="pi pi-minus"
                    onClick={() => {
                      const newQuantity = quantity - 1;
                      if (newQuantity <= 0)
                        removeFromBasket({ productId: _doc._id });
                      else
                        updateItemBasketQuantity({ productId: _doc._id, quantity: newQuantity });
                    }}
                  />
                  <Button
                    label="+"
                    icon="pi pi-plus"
                    onClick={() =>
                      updateItemBasketQuantity({ productId: _doc._id, quantity: quantity + 1 })
                    }
                  />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Basket;
