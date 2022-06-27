import { useState, useRef } from 'react'

import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'

import styles from './Create.module.css'

const Create = () => {
  const [listName, setListName] = useState('')
  const [newItem, setNewItem] = useState('')
  const [listItems, setListItems] = useState([])
  const [sharedUsers, setSharedUsers] = useState([])

  const inputRef = useRef()

  const handleSave = async () => {
    let itemsNoOpen = listItems

    itemsNoOpen.forEach(item => {
      delete item.open
    })

    let listObj = {
      name: listName,
      items: itemsNoOpen,
      ownerUid: auth.currentUser?.uid,
      shared: sharedUsers
    }

    try{
      const docRef = await addDoc(collection(db, 'lists'), listObj)
  
      window.location.pathname = `/list/${docRef.id}`
    }catch(err){
      console.log(err)
    }
  }

  return(
    <div className='globalContainer'>
      <div className='globalWrapper'>
        <div
          className={styles.listNameInputWrapper}
          onClick={() => inputRef.current.focus()}
        >
          <input
            type='text'
            placeholder='Add list name'
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            maxLength={16}
            className={styles.listNameInput}
            ref={inputRef}
          />
        </div>
        <div className={styles.itemsContainer}>
          <div className={styles.itemsWrapper}>
            {
              listItems.map((item, index) => {
                return(
                  <div
                    key={index}
                    className={styles.item}
                  >
                    <div
                      style={{position: 'absolute', top: '50%', left: '.9rem', transform: 'translateY(-50%)', cursor: 'pointer', pointerEvents: item.open ? 'all' : 'none' , opacity: `${item.open ? 1 : 0}`, transition: '.5s ease-in-out'}}
                      onClick={() => setListItems(listItems.filter((_, i) => index !== i))}
                    >
                      <div
                        style={{width: '.8rem', height: '.21rem', borderRadius: '1rem', backgroundColor: 'var(--color-red)'}}
                      />
                    </div>                      
                    <div
                      style={{transform: `translateX(${item.open ? '3.25rem' : '0'})`}}
                      className={styles.itemName}
                      onClick={() => {
                        setListItems(listItems.map((iitem, iindex) => {
                          if(index === iindex) {
                            return {
                              ...item,
                              open: !iitem.open
                            }
                          }
                          return iitem
                        }))
                      }}
                    >
                      {item.name}
                    </div>
                    <div className={styles.itemUnitCountWrapper}>
                      <input
                        onFocus={() => {
                          const newListItems = [...listItems]
                          newListItems[index].units = ''
                          setListItems(newListItems)

                        }}
                        onBlur={() => {
                          if(item.units === ''){
                            const newListItems = [...listItems]
                            newListItems[index].units = 1
                            setListItems(newListItems)
                          }
                        }}
                        className={styles.itemUnitCountInput}
                        style={{width: `${item.units.length === 2 ? 3 : 2}ch`}}
                        type='text'
                        inputMode='numeric'
                        value={item.units}
                        onChange={(e) => {
                          const newListItems = [...listItems]
                          newListItems[index].units = e.target.value
                          setListItems(newListItems)
                        }}
                        maxLength={2}
                      />
                    </div>
                  </div>
                )
              })
            }
          </div>
          {
            listItems.length < 100 &&
            <div className={styles.newItemWrapper}>
              <div
                className={styles.addBtn}
                onClick={() => {
                  if (newItem.length > 0) {
                    setListItems([...listItems, {name: newItem, units: '1', open: false}])
                    setNewItem('')
                  }
                }}
              >
                <div style={{height: '.8rem', width: '.15rem', backgroundColor: 'var(--color-dark-variant)', borderRadius: '1rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
                <div style={{width: '.8rem', height: '.15rem', backgroundColor: 'var(--color-dark-variant)', borderRadius: '1rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
              </div>
              <input
                type='text'
                placeholder='New item'
                value={newItem}
                onChange={(e) => {
                  setNewItem(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                }}
                maxLength={30}
                className={styles.newItemInput}
              />
            </div>
          }
          </div>
        <div
          className={styles.saveBtn}
          onClick={() => handleSave()}
        >
          Save
        </div>
      </div>
    </div>
  )
}

export default Create