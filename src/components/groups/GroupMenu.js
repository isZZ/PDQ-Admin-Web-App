import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import {Link} from 'react-router';

export class GroupMenu extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    const { activeItem } = this.state;
    const { groupId } = this.props;
    console.log('activeItem')
    console.log(this.props)

    return (
      <Menu vertical>
        <Link to={`/tracking/${groupId}`} activeClassName="current">
          <Menu.Item
            name="promotions"
            active={activeItem === "tracking"}>
            <Header as="h4">Tracking</Header>
            <p>Watch group members locations on a live map</p>
          </Menu.Item>
        </Link>
      </Menu>
    );
  }

  handleItemClick(e, {name}){
    console.log( name )
  }
}