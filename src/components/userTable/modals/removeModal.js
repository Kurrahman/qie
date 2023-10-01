import { useEffect, useState } from 'react'
import styles from './modal.module.css'
import Image from 'next/image'
import {  getUserDetailHandler, removeUserHandler } from '@/api/user'

const closeIcon = '/close.png'
export default function RemoveModal(props){
    const [name, setName] = useState('')

    function resetState(){
        setName('')
    }

    useEffect(() => {
        if (!props.show){
            resetState()
        }
        const fetchData = async () => {
            let [ok, response] = await getUserDetailHandler(props.id)
            setName(response.employee)
        }
        console.log(props.id)

        fetchData()
    }, [props.show])

    async function handleSubmit(event){
        event.preventDefault()
        await removeUserHandler(props.id)
        props.onClose()
    }

    return (
        <div className={styles.modal} style={{display: props.show ? 'block' : 'none'}}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <div>Remove User</div>
                    <Image
                        src={closeIcon}
                        width={20}
                        height={20}
                        className={styles.close}
                        onClick={() => props.onClose()}
                    />
                </div>
                <div className={styles.modalBody}>
                    <form className={styles.addFormContainer}>
                        <label className={styles.inputLabel}>
                            Are you sure to remove {name}?
                        </label>
                        <div className='flex row justify-end'>
                            <div onClick={(event) => handleSubmit(event)}>
                                <input type='submit' className={styles.submitButton} value='Remove' onSubmit={(event) => handleSubmit(event)}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}