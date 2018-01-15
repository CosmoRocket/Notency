import React, { Component } from 'react'
import ContentContainer from '../components/ContentContainer'
import MobileNav from '../components/MobileNav'
import DesktopNav from '../components/DesktopNav'
import { Link } from 'react-router-dom'
import AnnouncementForm from '../components/AnnouncementForm'
// react-draft-wysywig + dependencies
import { Editor } from 'react-draft-wysiwyg'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
// ------
export default function CreateAnnouncementPage({
  handleContentStateChange,
  contentState
}) {
  return (
    <div>
      <MobileNav />
      <div className="d-flex">
        <DesktopNav />
        <ContentContainer>
          <AnnouncementForm 
            contentState={ contentState }
            handleContentStateChange={ handleContentStateChange }/>
        </ContentContainer>
      </div>
    </div>
  )
}
