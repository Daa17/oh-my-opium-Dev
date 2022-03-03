import {DropdownSelector, Tabs, Button } from '@opiumteam/react-opium-components'
import React, { FC } from 'react'
// import PoolsList from '../PoolsList'

import '../../styles/main.scss'
import './styles.scss'

const tabItems = [
    {title: "All pools", eventKey: "All pools", content: <p>All pools</p>},
    {title: "My stake", eventKey: "My stake", content: <p>My stake</p>}
    
]
const programsDropdownItems = [
    { title: 'turbo', value: 'turbo'},
    { title: 'inshurance', value: 'inshurance' },
    { title: '$OPIUM products', value: '$OPIUM products'},
]
const sortDropdownItems = [
    { title: 'expiration date', value: 'expiration date'},
    { title: 'liquidity', value: 'liquidity' },
    { title: 'APR', value: 'APR'},
    { title: 'name', value: 'name'},
]
const mobileFilterItems = [
    { title: 'turbo', value: 'turbo'},
    { title: 'inshurance', value: 'inshurance' },
    { title: '$OPIUM products', value: '$OPIUM products'},
    { title: 'expiration date', value: 'expiration date'},
    { title: 'liquidity', value: 'liquidity' },
    { title: 'APR', value: 'APR'},
    { title: 'name', value: 'name'},
]
const applyFilter = () => {

}
const Filters: FC<{}> = () => {
    return (
        <div className="filters_wrapper">
            <div className="filters_tab_wrapper">
                <Tabs
                    id= "filters"
                    items={tabItems}
                    // defaultActiveKey="pools"
                />
            </div>
            <div className="dropdowns_container">
                <div className="dropdown-wrapper">
                    <DropdownSelector
                        title="Programs"
                        items={programsDropdownItems}
                    />
                </div>
                <div className="sort_dropdown">
                    <span>Sort by:</span>
                    <div className="dropdown-wrapper">
                        <DropdownSelector
                                title="expiration date"
                                items={sortDropdownItems}
                        />
                    </div>
                </div>
            </div>
            <div className="mobile_dropdowns">
                <div className="dropdown-wrapper">
                    <DropdownSelector
                           title=" "
                           items={mobileFilterItems}
                           className="filter_dropdown"
                           
                    >
                    <Button
                        variant='secondary'
                        className="apply_filter"
                        style={{
                            backgroundColor: 'transparent',
                            color: "#fff"
                        }}
                        label="apply"
                        onClick={applyFilter}
                    />
                    </DropdownSelector>
                </div>
            </div>
        </div>
    )
}

export default Filters