import { useRouter } from 'next/router'
import { useEffect } from "react"

export default function Story() {
  const router = useRouter()

  useEffect(() => {
    router.push('/about-us', undefined, { shallow: true })
  }, []);

  return (
    <> Loading </>
  );
}
