import { QUERY_MENU_ITEM } from '../utils/queries'
import { useQuery } from '@apollo/client';

export default function Menu() {
  const { loading, error, data } = useQuery(QUERY_MENU_ITEM);
  const menuItems = data?.menuItems || [];
  console.log(menuItems);

  return (
    <div>
      Hello World!
    </div>
  )
}