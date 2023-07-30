"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Employee {
    title: string;
    body: string;
    userId: number;
};

export default function ListUsers() {
    const mutation: any = useMutation({
        mutationFn: (newTodo: Employee) => {
            return axios.post('https://jsonplaceholder.typicode.com/posts', newTodo)
        },
    })

    return (
        <>
            {mutation.isLoading ? (<h1>Waiting</h1>) : (
                <>
                    {mutation.isError ? (
                        <div>An error occurred: {mutation.error.message}</div>
                    ) : null}

                    {mutation.isSuccess ? <div>{mutation.data.data.title}</div> : null}

                    <button
                        onClick={() => {
                            mutation.mutate({
                                title: "Hallo",
                                body: "asdasd",
                                userId: 1
                            })
                        }}
                    >
                        Create Todo
                    </button>
                </>
            )}
        </>
    );
}
