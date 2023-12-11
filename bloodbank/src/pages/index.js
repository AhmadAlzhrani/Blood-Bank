import { useRouter } from "next/router";
import { useMutation } from "react-query"

export default function Home() {

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (handle) => {
      return fetch('/api/pages', {
        method: 'POST',
        body: JSON.stringify({
          handle: handle,
        }),
      })
    },
    onSuccess: async (res) => {
      const handle = res;
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    
    const handle = event.target.elements[0].value;
    console.log(handle);
    if(!handle) return;

    mutation.mutate(handle);
  }

  return (
    <main>
      <h1>ask anynomisly</h1>
      {mutation.isLoading && <p>loading...</p>}
      {! mutation.isLoading && <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="handle">handle</label>
            <input type="text" placeholder="@aloha" required/>
          </div>
          <div>
            <button type="submit">create page</button>
          </div>
        </form>
      </div> }
    </main>
  )
}
