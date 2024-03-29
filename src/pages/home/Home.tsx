import CategoryList from '../../components/category/CategoryList'
import HeroWithImage from '../../components/common/HeroWithImage'

export default function Home() {
  return (
    <div className='dark:bg-black'>
      <HeroWithImage />
      <CategoryList />
    </div>
  )
}
