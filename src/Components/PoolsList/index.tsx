import React, { FC, useState } from 'react'
import { observer } from 'mobx-react'
import { useAlert } from 'react-alert'
import { ETheme, Popup } from '@opiumteam/react-opium-components'
import appStore from '../../Services/Stores/AppStore'
import authStore from '../../Services/Stores/AuthStore'
import {  getPurchasedProducts, isPoolMaintainable, getPurchasedProductsTheGraph } from '../../Services/Utils/methods'
import { PoolType, PositionType } from '../../Services/Utils/types'
import PositionsList from '../PositionsList'
import PoolListItem from './poolListItem'
import Wrapping from '../Wrapping'
import Maintenance from '../Maintenance'

import './styles.scss'

const PoolsList: FC<{}> = () => {
  const [ popupIsOpened, setPopupIsOpened ] = useState(false) 
  const [ positions, setPositions ] = useState<PositionType[]>([])
  const [ positionProductTitle, setPositionProductTitle ] = useState<string>('')
  
  const [ maintenanceIsOpened, setMaintenanceIsOpened ] = useState(false) 
  const [ poolToMaintain, setPoolToMaintain ] = useState<PoolType | null>(null) 
  const alert = useAlert()

  const userAddress = authStore.blockchainStore.address

  const showPurchasedProducts = async (pool: PoolType) => {
    let positions:  PositionType[] | undefined = []

    await getPurchasedProductsTheGraph(pool, userAddress)
      .then(res => {positions = res; console.log('getPurchasedProductsTheGraph positions',res)})
      .catch(async e => {
        await getPurchasedProducts(pool, userAddress, (e) => alert.error(e.message)).then(res => positions = res)
        console.log('getPurchasedProductsTheGraph catch',e)
      })

    if (positions && positions.length) {
      setPopupIsOpened(true)
      setPositions(positions)
      setPositionProductTitle(pool.title)
    } else {
      alert.error('There are no purchased products')
    }
  }

  

  // useEffect(() => {
  //   const getAllPurchasedProducts = async () => {
  //     let positions: PositionType[] | undefined = [];
  //     const pools = appStore.poolsByNetwork.filter((pool) => !pool.isSuspended);
  //     await Promise.all(
  //       pools.map(async (pool) => {
  //         await getPurchasedProductsTheGraph(pool, userAddress).then((res) => {
  //           positions = res;
  //           console.log("positions outside if ", positions);
  //         });
  //       })
  //     )
  //       .then(() => {
  //         if (positions && positions.length) {
  //           console.log("positions inside if ", positions);
  //           // setPopupIsOpened(true);
  //           setPositions(positions);
  //           setPositionProductTitle("All products");
  //         } else {
  //           alert.error("There are no purchased products");
  //         }
  //       })
  //       .catch((e) => {
  //         alert.error(
  //           "Something wen wrong, please try to show products in the pool"
  //         );
  //       });
  //   };
  //    getAllPurchasedProducts()
  //   return ()=>{ 
  //     getAllPurchasedProducts()
  //   }
  // }, [userAddress, alert]);

  const closePopup = () => {
    setPopupIsOpened(false)
      setPositionProductTitle('')
      setPositions([])
  }


  const showMaintenance = async (pool: PoolType) => {
    if (!pool.oracle || pool.isSuspended) {
      alert.error('This pool is unmaintainable') 
      return
    }

    const isMaintainable = await isPoolMaintainable(pool.poolAddress)

    if (!isMaintainable) {
      alert.error('Current epoch has not finished yet') 
      return
    }

    setPoolToMaintain(pool)
    setMaintenanceIsOpened(true)
  }

  const closeMaintenance = () => {
    setPoolToMaintain(null)
    setMaintenanceIsOpened(false)
  }
  
  return (
    <div className='pools-list-wrapper'>
      <Popup
        theme={ETheme.DARK}
        titleSize="lg"
        title="Purchased products"
        subtitle={positionProductTitle}
        className='positions-list-popup'
        popupIsOpen={popupIsOpened}
        closePopup={closePopup}
        component={<PositionsList positions={positions}/>}
      />

      <Popup
        theme={ETheme.DARK}
        titleSize='lg'
        title='Wrapping'
        className='positions-list-popup'
        popupIsOpen={appStore.wrappingPopupIsOpened}
        closePopup={() => appStore.setWrappingPopupIsOpened(false)}
        component={<Wrapping />}
      />

      <Popup
        theme={ETheme.DARK}
        titleSize='lg'
        title='Maintenance'
        className='positions-list-popup'
        popupIsOpen={maintenanceIsOpened}
        closePopup={closeMaintenance}
        component={<Maintenance pool={poolToMaintain}/>}
      />
      {positions && positions.length ? (
        positions.map((props) => (
          <div
            style={{
              backgroundColor: "white",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            {typeof props == "object" && JSON.stringify(props)}
          </div>
        ))
      ) : (
        <p style={{ color: "red" }}>positions is empty array</p>
      )}
      {appStore.poolsByNetwork.map((pool) => {
        return <PoolListItem pool={pool} showPurchasedProducts={() => showPurchasedProducts(pool)} showMaintenance={() => showMaintenance(pool)} key={pool.poolAddress}/>
      })}
    </div>
  )
}

export default observer(PoolsList)
