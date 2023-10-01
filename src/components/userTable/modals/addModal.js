import { useState } from 'react'
import styles from './modal.module.css'
import Image from 'next/image'
import { addUserHandler } from '@/api/user'

const closeIcon = '/close.png'
export default function AddModal(props){
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function validateForm(){
        if (((confirmPassword !== '') && (password !== '')) && (password !== confirmPassword)){
            return (
                <span className={styles.alert}>Password did not match</span>
            )
        }
        return <div></div>
    }

    function disableSubmit(){
        if (name === '') return true
        if (department === '') return true
        if (email === '') return true
        if (password === '') return true
        if (confirmPassword === '') return true
        return false
    }

    async function handleSubmit(event){
        event.preventDefault()
        let data = {
            email: email,
            employee: name,
            password: password,
            confirm_password: confirmPassword,
            is_active: true,
            departement: department
        }
        let [ok, response] = await addUserHandler(data)
        props.onClose()
    }

    return (
        <div className={styles.modal} style={{display: props.show ? 'block' : 'none'}}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <div>Add User</div>
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
                                <input type='text' name='employee' className={styles.input} onChange={(e) => setName(e.target.value)}/>
                                <label className={styles.inputLabel}>Department</label>
                                <input type='text' name='department' className={styles.input} onChange={(e) => setDepartment(e.target.value)}/>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Email</label>
                                <input type='text' name='email' className={styles.input} onChange={(e) => setEmail(e.target.value)}/>
                                <label className={styles.inputLabel}>Password</label>
                                <input type='password' name='password' className={styles.input} onChange={(e) => setPassword(e.target.value)}/>
                                <label className={styles.inputLabel}>Confirm Password</label>
                                <input type='password' name='confirmPassword' className={styles.input} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className='flex row justify-between'>
                            {
                                validateForm()
                            }
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