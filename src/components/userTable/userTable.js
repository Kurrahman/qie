import { useEffect, useState } from 'react'
import styles from './userTable.module.css'
import { allUserHandler } from '@/api/user'
import Image from 'next/image'
import AddModal from './modals/addModal'
import EditModal from './modals/editModal'
import RemoveModal from './modals/removeModal'

const editIcon = '/edit-user.png' 
const removeIcon = '/remove-user.png' 
const prevIcon = '/prev.png'
const nextIcon = '/next.png'
const plusIcon ='/plus.png'
const tableDivider =  "1px solid #DFE2E1"

export default function UserTable(){
    const pageSize = 5
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [allUser, setAllUser] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const [removeId, setRemoveId] = useState('')
    const [showEditModal, setShowEditModal] = useState(false)
    const [editId, setEditId] = useState('')

    useEffect(() => {
        const fetchData = async () =>{
            let [_, response] = await allUserHandler(page, pageSize)
            setAllUser(response.results)
            setTotalPage(response.page_count)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () =>{
            let [_, response] = await allUserHandler(page, pageSize)
            setAllUser(response.results)
            setTotalPage(response.page_count)
        }

        fetchData()
    }, [page, showAddModal, showEditModal, showRemoveModal])

    function getStatus(isActive){
        return (
            <div className={isActive ? styles.active : styles.inactive}>
                {isActive ? 'ACTIVE' : 'INACTIVE'}
            </div>
        )
    }

    function onAddUser(){
        setShowAddModal(true)
    }

    function onEditUser(id){
        setEditId(id)
        setShowEditModal(true)
    }

    function onRemoveUser(id){
        setRemoveId(id)
        setShowRemoveModal(true)
    }

    function Pagination(){
        const pageNumbers = []
        for (let i = 1; i <= totalPage; i++){
            pageNumbers.push(i)
        }
        const handleMovePage = (event) => {
            console.log(event.selected)
            console.log(page)
            setPage(page + event.selected)
        }
        return (
            <div className={styles.pagination}>
                <ul className='flex row gap-2'>
                    <li>
                        <Image
                            src={prevIcon}
                            width={25}
                            height={25}
                            onClick={
                                (page === 1) ?
                                () => {} :
                                () => setPage(page-1)
                            }
                        />
                    </li>
                    {pageNumbers.map((number) => (
                        <li 
                            key={number} 
                            className={(number === page)? styles.currentPage : styles.pageNumber}
                            onClick={() => setPage(number)}
                        >
                            {number}
                        </li>
                    ))}
                    <li>
                        <Image
                            src={nextIcon}
                            width={25}
                            height={25}
                            onClick={
                                (page === totalPage) ?
                                () => {} :
                                () => setPage(page+1)
                            }
                        />
                    </li>
                </ul>
            </div>
        )
    }
    return (
        <div>
            <AddModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
            />
            <EditModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                id={editId}
            />
            <RemoveModal
                show={showRemoveModal}
                onClose={() => setShowRemoveModal(false)}
                id={removeId}
            />
            <div className={styles.tableContainer}>
                <table className={styles.salesTable}>
                    <thead>
                        <tr>
                            <th className={styles.tableHead}>Employee</th>
                            <th className={styles.tableHead}>Email</th>
                            <th className={styles.tableHead}>Status</th>
                            <th className={styles.tableHead}>Action</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {
                            allUser.map(function(row, i){
                                return (
                                    <tr key={row.id} style={{borderBottom: tableDivider}}>
                                        <td className={styles.tableCell}>
                                            {row.employee}
                                        </td>
                                        <td className={styles.tableCell}>
                                            {row.email}
                                        </td>
                                        <td className={styles.tableCell}>
                                            {getStatus(row.is_active)}
                                        </td>
                                        <td className={styles.tableCell}>
                                            <div className='flex col gap-2'>
                                                <div className={styles.editContainer}>
                                                    <Image
                                                        src={editIcon}
                                                        width={25}
                                                        height={25}
                                                        onClick={() => onEditUser(row.id)}
                                                    />
                                                </div>
                                                <div className={styles.removeContainer}>
                                                    <Image
                                                        src={removeIcon}
                                                        width={25}
                                                        height={25}
                                                        onClick={() => onRemoveUser(row.id)}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className={styles.footer}>
                <div className={styles.addUserContainer} onClick={() => onAddUser()}>
                    <Image
                        src={plusIcon}
                        width={20}
                        height={20}
                    />
                    Add User
                </div>
                <Pagination/>
            </div>
        </div>
    )
}