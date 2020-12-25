import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import storeImage from '../assets/store.jpg';
import { IStore } from '../contexts/stores';

interface Props {
  store: IStore;
}

const StoreCard: React.FC<Props> = (props) => {
  const { store } = props;
  const history = useHistory();
  return (
    <div>
      <Card style={{ maxWidth: 250, margin: 10 }}>
        <CardImg
          top
          width="100%"
          style={{ height: 150, width: 'auto' }}
          src={storeImage}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h5">{store.description}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {store.user?.name}
          </CardSubtitle>
          <CardText></CardText>
          <Button
            color="primary"
            block
            onClick={() => history.push(`/liststores/${store.id}`)}
          >
            View
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default StoreCard;
