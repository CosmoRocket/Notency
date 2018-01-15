import React, { Component } from 'react'
import ContentContainer from '../components/ContentContainer'
import MobileNav from '../components/MobileNav'
import DesktopNav from '../components/DesktopNav'
import { Link } from 'react-router-dom'

class CreateNotificationPage extends Component {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <div>
        <MobileNav />
        <div className="d-flex">
          <DesktopNav />
          <ContentContainer>
            <Link to="/">Back</Link>
          </ContentContainer>
        </div>
      </div>
    )
  }
}

export default CreateNotificationPage
