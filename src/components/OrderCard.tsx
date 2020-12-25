import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import orderImage from '../assets/perfect-order.jpg';
import { IOrder, useOrders } from '../contexts/orders';

interface Props {
  order: IOrder;
}

const OrderCard: React.FC<Props> = (props) => {
  const { order } = props;
  const { acceptOrder, refuseOrder, finishOrder } = useOrders();
  return (
    <div>
      <Card style={{ maxWidth: 350, margin: 10 }}>
        <CardImg
          top
          width="100%"
          style={{ height: 150, width: 'auto' }}
          src={orderImage}
          alt="Card image cap"
        />
        <CardBody>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardTitle tag="h5">{order.status}</CardTitle>
          </div>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {order.user.name}
          </CardSubtitle>
          <CardText></CardText>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {order.status === 'PENDING' && (
              <Button color="success" onClick={() => acceptOrder(order.id)}>
                Accept
              </Button>
            )}
            {order.status === 'ACCEPTED' && (
              <Button color="primary" onClick={() => finishOrder(order.id)}>
                Finish
              </Button>
            )}
            {order.status === 'PENDING' && (
              <Button color="danger" onClick={() => refuseOrder(order.id)}>
                Refuse
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrderCard;
