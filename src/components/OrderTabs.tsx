import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row } from 'reactstrap';
import classnames from 'classnames';
import { IOrder } from '../contexts/orders';
import OrderCard from './OrderCard';

interface Props {
  orders: IOrder[];
}

const OrderTabs: React.FC<Props> = (props) => {
  const { orders } = props;
  const [activeTab, setActiveTab] = useState('1');
  const newOrders = orders.filter((order) => order.status === 'PENDING');
  const acceptedOrders = orders.filter((order) => order.status === 'ACCEPTED');
  const finishedOrders = orders.filter((order) => order.status === 'DONE');

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            style={{ color: '#495057', cursor: 'pointer' }}
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            New Orders ({newOrders.length})
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ color: '#495057', cursor: 'pointer' }}
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Accepted Orders ({acceptedOrders.length})
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ color: '#495057', cursor: 'pointer' }}
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            Finished Orders ({finishedOrders.length})
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} style={{ paddingTop: 10 }}>
        <TabPane tabId="1">
          <Row xs="1" sm="2" md="3">
            {newOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row xs="1" sm="2" md="3">
            {acceptedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row xs="1" sm="2" md="3">
            {finishedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default OrderTabs;
