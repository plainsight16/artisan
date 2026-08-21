import { useState } from 'react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { fetchUsers, createUser } from './api/users'

export default function App() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const queryClient = useQueryClient()

//   // 1. Declarative data fetching (No useEffect, no manual abort signals)
//   const { data: users, isLoading, isError, error } = useQuery({
//     queryKey: ['users'],
//     queryFn: fetchUsers,
//   })

//   // 2. Mutations with automatic cache invalidation
//   const mutation = useMutation({
//     mutationFn: createUser,
//     onSuccess: () => {
//       // Forces TanStack Query to refetch the users list from Go
//       queryClient.invalidateQueries({ queryKey: ['users'] })
//       setName('')
//       setEmail('')
//     },
//   })

//   const handleSubmit = (e: React.SubmitEvent) => {
//     e.preventDefault()
//     if (!name || !email) return
//     mutation.mutate({ name, email })
//   }

//   if (isLoading) return <p>Loading users from Go backend...</p>
//   if (isError) return <p>Error: {error.message}</p>

//   return (
//     <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
//       <h1>Users Management</h1>

//       <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
//         <input
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button type="submit" disabled={mutation.isPending}>
//           {mutation.isPending ? 'Adding...' : 'Add User'}
//         </button>
//       </form>

//       <ul>
//         {users?.map((user) => (
//           <li key={user.id}>
//             <strong>{user.name}</strong> — {user.email}
//           </li>
//         ))}
//       </ul>
//     </main>
//   )
return(
  <h1>Helloooo</h1>
)
}
