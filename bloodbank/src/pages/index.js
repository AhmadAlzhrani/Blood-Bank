import { useRouter } from "next/router";
import { useMutation } from "react-query"

export default function Home() {

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (handle) => {
      console.log('handle: ',handle);
      return fetch('/api/pages', {
        method: 'POST',
        body: JSON.stringify({handle}),
      })
    },
    onSuccess: async (res) => {
      //const body = res.body;
      const handle = res;
      console.log('handle2222: ',handle);
      //router.push(`/${handle}`);
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
