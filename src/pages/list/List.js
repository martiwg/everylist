import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

import styles from './List.module.css'

const ERROR_CODES = {
  'NOT_FOUND': 'List not found',
  'NO_LIST': 'No list provided',
  'SERVER_ERROR': 'Server error'
}

const List = () => {
  const [list, setList] = useState()
  const [error, setError] = useState()

  const [checkedItems, setCheckedItems] = useState([])
  const [uncheckedItems, setUncheckedItems] = useState([])

  const { id } = useParams()

  const downloadList = async () => {
    if(!id){
      setError(ERROR_CODES.NO_LIST)
      return
    }

    try{
      const docSnap = await getDoc(doc(db, 'lists', id))
      
      if(!docSnap.exists){
        setError(ERROR_CODES.NOT_FOUND)
        return
      }

      setList(docSnap.data())
    }catch(err){
      setError(ERROR_CODES.SERVER_ERROR)
    }
  }

  useEffect(() => {
    downloadList()
  }, [])

  useEffect(() => {
    if(list){
      let tempChecked = []
      let tempUnchecked = []

      list.items.forEach(item => {
        if(item.checked){
          tempChecked = [item, ...tempChecked]
        }else{
          tempUnchecked = [item, ...tempUnchecked]
        }
      })

      setCheckedItems(tempChecked)
      setUncheckedItems(tempUnchecked)
    }
  }, [list])

  return(
    <div className='globalContainer'>
      <div className='globalWrapper'>
        {
          list &&
          <>
            <div className={styles.nameCard}>
              <div className={styles.progressTop}>
                <div
                  className={styles.progressTitle}
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                  {/* ADD COPY SVG */}
                  {list.name}
                </div>
                <div className={styles.progressRatioWrapper}>
                  <div className={styles.progressRatio}>
                    {checkedItems.length} <span style={{fontSize: '.7rem', fontWeight: 900, margin: '0 .1rem'}}>/</span> {list.items.length}
                  </div>
                </div>
              </div>
              <div className={styles.progressBottom}>
                <div className={styles.outterBar}>
                  <div className={styles.innerBar} style={{width: `${checkedItems.length / list.items.length * 100}%`}}>
                    <div className={styles.progressBtn} style={{opacity: checkedItems.length > 0 ? 1 : 0, boxShadow:  checkedItems.length < list.items.length ? '0 0 6px rgba(0, 0, 0, 0.15)' : 'none'}}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.itemsWrapper}>
              {
                list.items.map((item, index) => {
                  return(
                    <div
                      key={index}
                      className={styles.itemWrapper}
                    >
                      <div className={styles.leftItemSection}>
                        <div
                          className={styles.checkbox}
                          style={{backgroundColor: item.checked ? '#388BFF' : 'transparent'}}
                          onClick={() => {
                            const newList = {...list}
                            newList.items[index].checked = !item.checked
                            setList(newList)
                          }}
                        >
                          <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="100%" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill='#fff'>
                            <path d="M16.972,6.251c-0.967-0.538-2.185-0.188-2.72,0.777l-3.713,6.682l-2.125-2.125c-0.781-0.781-2.047-0.781-2.828,0  c-0.781,0.781-0.781,2.047,0,2.828l4,4C9.964,18.792,10.474,19,11,19c0.092,0,0.185-0.006,0.277-0.02  c0.621-0.087,1.166-0.46,1.471-1.009l5-9C18.285,8.005,17.937,6.788,16.972,6.251z"/>
                          </svg>
                        </div>
                        <div className={styles.itemName} style={{opacity: item.checked ? .5 : 1}}>
                          {item.name}
                        </div>
                      </div>
                      <div className={styles.itemUnits} style={{opacity: item.checked ? .5 : 1, width: item.units > 9 ? '3ch' : '2ch'}}>
                        {item.units}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default List