// @ts-nocheck
/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      {/* <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Profiles</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' state= {{from: "user._id"}} title='Profile' hasBullet={true}>
          <AsideMenuItem to='/dashboard' state= {{from: "user._id"}} title='Overview' hasBullet={true} />
          {/* <AsideMenuItem to='/dashboard' state= {{from: "user._id"}} title='Projects' hasBullet={true} />
          <AsideMenuItem to='/dashboard'state= {{from: "user._id"}}  title='Campaigns' hasBullet={true} />
          <AsideMenuItem to='/dashboard'state= {{from: "user._id"}} title='Documents' hasBullet={true} />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            state= {{from: "user._id"}}
            title='Connections'
            hasBullet={true}
          /> */}
        </AsideMenuItemWithSub>

        {/* <AsideMenuItemWithSub to='/crafted/pages/wizards'state= {{from: "user._id"}} title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical'state= {{from: "user._id"}} title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub> */}

      </AsideMenuItemWithSub>
      {/* <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview'state= {{from: "user._id"}} title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' state= {{from: "user._id"}} title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub   
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        state= {{from: "user._id"}}
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <AsideMenuItem to='/error/404'state= {{from: "user._id"}} title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500'state= {{from: "user._id"}} title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
        state= {{from: "user._id"}}
      >
        <AsideMenuItem to='/crafted/widgets/lists' state= {{from: "user._id"}} title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics'state= {{from: "user._id"}} title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts'state= {{from: "user._id"}} title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' state= {{from: "user._id"}} title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables'state= {{from: "user._id"}} title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds'state= {{from: "user._id"}} title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div> */}
      {/* <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        state= {{from: "user._id"}}
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/chat/private-chat'state= {{from: "user._id"}} title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' state= {{from: "user._id"}} title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' state= {{from: "user._id"}} title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItem
        to='/apps/user-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User management'
        state= {{from: "user._id"}}
        fontIcon='bi-layers'
      /> */}
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          {/* <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span> */}
          {/* <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span> */}
        </a>
      </div>
    </>
  )
}
