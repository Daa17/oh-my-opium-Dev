import {Tabs } from '@opiumteam/react-opium-components'
import React, { FC } from 'react'
import PoolsList from '../PoolsList'
// import PositionsList from '../PositionsList'

import './styles.scss'

const tabItems = [
    {title: "pools", eventKey: "pools", content: <PoolsList/>},
    {title: "positions", eventKey: "positions", content: <p>Positions</p>},
    {title: "wOpium", eventKey: "wOpium", content: <p>wOpium</p>}
]
const MainTabs: FC<{}> = () => {
    return (
        <div className="main_tabs">
           <Tabs
                id= "main-tabs"
                items={tabItems}
                // defaultActiveKey="pools"
           />
        </div>
    )
}

export default MainTabs