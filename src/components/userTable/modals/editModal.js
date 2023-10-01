import { useEffect, useState } from 'react'
import styles from './modal.module.css'
import Image from 'next/image'
import { editUserHandler, getUserDetailHandler } from '@/api/user'

const closeIcon = '/close.png'
const checkboxChecked = '/checked.png'
const checkboxUnchecked = '/unchecked.png'
export default function EditModal(props){
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [email, setEmail] = useState('')
    const [isActive, setIsActive] = useState(true)

    function resetState(){
        setName('')
        setDepartment('')
        setEmail('')
        setIsActive(true)
    }

    useEffect(() => {
        if (!props.show){
            resetState()
        }
        const fetchData = async () => {
            let [ok, response] = await getUserDetailHandler(props.id)
            setName(response.employee)
            setDepartment(response.departement)
            setEmail(response.email)
            setIsActive(response.is_active)
        }

        fetchData()
    }, [props.show])

    function disableSubmit(){
        if (name === '') return true
        if (department === '') return true
        if (email === '') return true
        return false
    }

    async function handleSubmit(event){
        event.preventDefault()
        let data = {
            email: email,
            employee: name,
            is_active: isActive,
            departement: department
        }
        await editUserHandler(props.id, data)
        props.onClose()
    }

    function flipCheckbox(){
        setIsActive(!isActive)
    }

    return (
        <div className={styles.modal} style={{display: props.show ? 'block' : 'none'}}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <div>Edit User</div>
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
                        <div className='flex row gap-3'>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Name</label>
                                <input type='text' name='employee' value={name} className={styles.input} onChange={(e) => setName(e.target.value)}/>
                                <label className={styles.inputLabel}>Department</label>
                                <input type='text' name='department' value={department} className={styles.input} onChange={(e) => setDepartment(e.target.value)}/>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Email</label>
                                <input type='text' name='email' value={email} className={styles.input} onChange={(e) => setEmail(e.target.value)}/>
                                <label className={styles.inputLabel}>Status</label>
                                <Image
                                    src={isActive ? checkboxChecked : checkboxUnchecked}
                                    width={30}
                                    height={30}
                                    onClick={() => flipCheckbox()}
                                    className={styles.checkbox}
                                />
                            </div>
                        </div>
                        <div className='flex row justify-end'>
                            <div onClick={(event) => handleSubmit(event)}>
                                <input type='submit' className={styles.submitButton} value='Submit' disabled={disableSubmit()} onSubmit={(event) => handleSubmit(event)}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}