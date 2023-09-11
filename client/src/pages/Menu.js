import { QUERY_MENU } from '../utils/queries'
import { useQuery } from '@apollo/client';

export default function Menu() {
  const { loading, data } = useQuery(QUERY_MENU);
  const menu = data?.menu || [];
  console.log(menu)

  return (
    <div>
      Hello World!
    </div>
  )
}