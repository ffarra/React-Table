import React, {useEffect, useState} from 'react';
import AddUser from "./AddUser";
import {Alert, Spinner} from "react-bootstrap";
import {IUser} from "../types/Types";
import InfiniteScroll from "react-infinite-scroll-component";

const UserTable = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(2)
    const [error, setError] = useState('')


    const getUsers = async () => {
        try {
            setIsLoading(true)
            setError('')
            const result = await fetch(`http://localhost:3004/users?_page=1`);
            const data = await result.json();
            setUsers(data)
            setIsLoading(false)
        }
        catch (e: any) {
            const error = e.message
            setIsLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
            getUsers();
    }, [])

    const fetchUsers = async () => {
        const result = await fetch(`http://localhost:3004/users?_page=${page}`);
        const data = await result.json();
        return data
    }

    const fetchData = async () => {
        const newUsers = await fetchUsers();
        setUsers([...users, ...newUsers])

        if(newUsers.length === 0) {
            setHasMore(false)
        }
        setPage(prev => prev + 1)
    }

    return (
        <>
            {isLoading && <Spinner animation="border" variant="success" />}
            {error && <Alert variant='danger'>Error: {error}</Alert>}
            <div className='container'>
                    <div className='pb-5'>
                        <h2>User Listing</h2>
                        <AddUser/>
                    </div>
                            <InfiniteScroll
                                next={fetchData}
                                hasMore={hasMore}
                                loader={<p>Loading...</p>}
                                dataLength={users.length}
                                endMessage={
                                <p className='text-center fw-bold'>end of list</p>
                                }
                                height={500}
                            >
                                <table className='table table-bordered'>
                                    <thead className='bg-light text-dark'>
                                    <tr>
                                        <td>id</td>
                                        <td>First Name</td>
                                        <td>Last Name</td>
                                        <td>Age</td>
                                        <td>Phone Number</td>
                                        <td>Email Address</td>
                                    </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            users && users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.age}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </InfiniteScroll>
            </div>
        </>
    );
};

export default UserTable;