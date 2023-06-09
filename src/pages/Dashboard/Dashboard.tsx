/* eslint-disable jsx-a11y/iframe-has-title */
import { useQuery } from 'react-query'
import { getProduct } from 'src/apis/product.api'
import ProductItem from 'src/components/ProductItem/ProductItem'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'

const Dashboard = () => {
  const { t } = useTranslation('home')
  const queryConfig = {
    page: 1,
    limit: 4,
    sort_by: 'countInStock'
  }
  const queryConfigS = {
    page: 1,
    limit: 4,
    sort_by: 'createdAt'
  }
  const queryConfigSS = {
    page: 1,
    limit: 4,
    sort_by: 'selled'
  }
  const { data: productsPopullarData, isLoading: isLoadingPoppular } = useQuery({
    queryKey: ['productList', queryConfig],
    queryFn: () => {
      return getProduct(queryConfig)
    },
    onSuccess: () => {
      window.scroll({
        top: 0,
        left: 0
      })
    }
  })
  const { data: productsRecentData, isLoading: isLoadingRecent } = useQuery({
    queryKey: ['productList', queryConfigS],
    queryFn: () => {
      return getProduct(queryConfigS)
    }
  })
  const { data: productsSelledData, isLoading: isLoadingSelled } = useQuery({
    queryKey: ['productList', queryConfigSS],
    queryFn: () => {
      return getProduct(queryConfigSS)
    }
  })
  const heroSliderData = [
    {
      title: 'Polo nữ Pima cao cấp',
      description:
        'Nhắc đến sự đẳng cấp là không thể không nhắc đến dòng vải pima. Nó tạo nên chất lượng tốt nhất cho bất kỳ sản phẩm thời trang nào. Sợi vải pima dài và dày hơn sợi cotton thông thường gấp đôi nhờ công nghệ dệt tân tiến. Điều đó làm cho kết cấu áo polo chắc chắn, bền chặt, hạn chế tối đa xù lông, mềm mượt, bền màu, vô cùng đảm bảo sức khoẻ người dùng',
      img: 'https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj'
    },
    {
      title: 'Polo Nữ Dáng Suông Modal',
      description:
        'Polo nữ dáng suông Modal sử dụng công nghệ vải cao cấp thân thiện với môi trường sản xuất độc quyền chống co rút vải, áo polo nữ vải modal là sản phẩm thích hợp cho các bạn có môi trường làm việc năng động như hiện nay',
      img: 'https://gaixinhbikini.com/wp-content/uploads/2022/09/52321187927_023da6d2ec_o.jpg'
    },
    {
      title: 'Polo Nữ Coolmax Lacoste',
      description:
        'Mẫu áo polo nữ được làm bằng chất liệu coolmax đem lại cảm giác mát lạnh khi mặc. Thiết kế mẫu áo polo coolmax này có kiểu dáng cực kỳ thoải mái. Tạo sự gọn gàng hứa hẹn sẽ là mẫu áo polo vô cùng hot trong thời điểm sắp tới',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAeJBmW_rTiidfjLLpYa3UhCsr8W4X8kTfONO-EeM&s'
    }
  ]
  return (
    <div>
      {/* <div className='h-[40px] overflow-hidden'>
        <iframe src='http://localhost:3000/' className='h-full overflow-hidden' />
      </div> */}
      <Helmet>
        <title>Trang chủ | Virtue Shop</title>
        <meta name='description' content='Trang chủ Virtue Shop' />
      </Helmet>
      <div className='flex'>
        <div className='mobile:ml-[30px] tablet:mr-10'>
          <section className='mb-[20px] mobile:w-[90vw] mobile:mr-10'>
            <h1 className='font-[600] text-[18px] leading-7 dark:text-white mb-[20px]'>{t('popular products')}</h1>
            {isLoadingPoppular && (
              <div className='text-center my-20'>
                <div role='status'>
                  <svg
                    aria-hidden='true'
                    className='inline w-[100px] h-[100px] mr-2 text-gray-200 animate-spin  fill-primary'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            )}
            <div className='gap-x-[30px] w-full grid grid-cols-4 mobile:flex mobile:w-[100%] mobile:mr-10 mobile:overflow-x-auto'>
              {productsPopullarData?.data.data.map((item) => {
                return (
                  <div key={item._id}>
                    <ProductItem product={item}></ProductItem>
                  </div>
                )
              })}
            </div>
          </section>
          <section className='mb-[20px] mobile:w-[90vw] mobile:mr-10'>
            <h1 className='font-[600] text-[18px] leading-7 dark:text-white mb-[20px]'>{t('latest products')}</h1>
            {isLoadingRecent && (
              <div className='text-center my-20'>
                <div role='status'>
                  <svg
                    aria-hidden='true'
                    className='inline w-[100px] h-[100px] mr-2 text-gray-200 animate-spin  fill-primary'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            )}
            <div className='gap-[30px] grid grid-cols-4  mobile:flex mobile:w-[100%] mobile:overflow-x-auto'>
              {productsRecentData?.data.data.map((item) => {
                return (
                  <div key={item._id}>
                    <ProductItem product={item}></ProductItem>
                  </div>
                )
              })}
            </div>
          </section>
          <section className='mb-[20px] mobile:w-[90vw] mobile:mr-10'>
            <h1 className='font-[600] text-[18px] leading-7 dark:text-white mb-[20px]'>{t('selled products')}</h1>
            {isLoadingSelled && (
              <div className='text-center my-20'>
                <div role='status'>
                  <svg
                    aria-hidden='true'
                    className='inline w-[100px] h-[100px] mr-2 text-gray-200 animate-spin  fill-primary'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            )}
            <div className='gap-[30px] grid grid-cols-4 mobile:flex mobile:w-[100%] mobile:overflow-x-auto'>
              {productsSelledData?.data.data.map((item) => {
                return (
                  <div key={item._id}>
                    <ProductItem product={item}></ProductItem>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
